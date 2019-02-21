from flask import Flask, jsonify, request, json, render_template
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from flask_marshmallow import Marshmallow
from datetime import datetime
from flask_jwt_extended import (JWTManager, jwt_required, verify_jwt_in_request, get_jwt_claims, create_access_token,
                                get_jwt_identity)
from werkzeug.exceptions import HTTPException
from flask_mail import Mail, Message
import os,subprocess
from flask_heroku import Heroku


app = Flask(__name__, template_folder="client/build", static_folder="client/build/static")

CORS(app)
app.config.from_object(os.environ['APP_SETTINGS'])


heroku = Heroku(app)
mail = Mail(app)
db = SQLAlchemy(app)
marsh = Marshmallow(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

from models import Users, Admins, Awards, UserSchema, AdminSchema, AwardSchema
from auth import admin_only, user_only


# Main Portal
@app.route('/')
def index():
    return render_template('index.html')


''' ################################################ USERS ################################################ '''


# GET : Get all user
@app.route('/user', methods=['GET'])
@admin_only
def getAllUser():
    users = Users.query.all()
    schema = UserSchema(many=True)
    return jsonify(schema.dump(users).data)


# GET : Get individual user
@app.route('/user/<int:u_id>', methods=['GET'])
# @admin_only
def getIndUser(u_id):
    user = Users.query.get(u_id)
    if user:
        schema = UserSchema()
        return jsonify(schema.dump(user).data)
    else:
        return jsonify({"User": "User not found."})


# Get user's username
def check_user_in_db(firstName, lastName):
    user = Users.query.filter_by(first_name=firstName, last_name=lastName).first()
    if user:
        return user.user_name
    else:
        return jsonify({"User": "User not found."})


# POST : Create new user 
@app.route('/user', methods=['POST'])
@admin_only
def postUser():
    user = UserSchema()
    # Hash password 
    passHash = bcrypt.generate_password_hash(request.form['password'])
    newUser = Users(request.form['username'],
                    passHash,
                    request.form['first_name'],
                    request.form['last_name'],
                    request.files['sig'].read())

    db.session.add(newUser)
    db.session.commit()
    return user.jsonify(newUser)


# PATCH : Update user first and last name
@app.route('/user/<int:u_id>', methods=['PATCH'])
@jwt_required
def patchUser(u_id):
    user = Users.query.get(u_id)
    if user:
        schema = UserSchema()
        user.first_name = request.json['first_name']
        user.last_name = request.json['last_name']
        user.user_name = request.json['username']
        user.user_password = request.json['password']
        db.session.commit()
        return schema.jsonify(user)
    else:
        return jsonify({"User": "User not found."})


# DELETE : Delete user given id 
@app.route('/user/<int:u_id>', methods=['DELETE'])
@admin_only
def deleteUser(u_id):
    user = Users.query.get(u_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"User": "User is deleted"})
    else:
        return jsonify({"User": "User not found."})


''' ################################################ ADMINS ################################################ '''


# GET : Get all admin
@app.route('/admin', methods=['GET'])
@admin_only
def getAllAdmin():
    admins = Admins.query.all()
    schema = AdminSchema(many=True)
    return jsonify(schema.dump(admins).data)


# GET : Get individual admin
@app.route('/admin/<int:a_id>', methods=['GET'])
@admin_only
def getIndAdmin(a_id):
    admins = Admins.query.filter_by(id=a_id).first()
    if admins:
        schema = AdminSchema()
        return jsonify(schema.dump(admins).data)
    else:
        return jsonify({"Admin": "Admin not found."})


# POST : Create new admin
@app.route('/admin', methods=['POST'])
def postAdmin():
    adminSchema = AdminSchema()
    passHash = bcrypt.generate_password_hash(request.json['password'])
    newAdmin = Admins(request.json['admin_name'],
                      passHash)
    db.session.add(newAdmin)
    db.session.commit()
    return adminSchema.jsonify(newAdmin)


# PATCH : Update admin username and password
@app.route('/admin/<int:a_id>', methods=['PATCH'])
@admin_only
def patchAdmin(a_id):
    admin = Admins.query.get(a_id)
    if admin:
        adminSchema = AdminSchema()
        passHash = bcrypt.generate_password_hash(request.json['password'])
        admin.admin_name = request.json['admin_name']
        admin.admin_password = passHash
        db.session.commit()
        return adminSchema.jsonify(admin)
    else:
        return jsonify({"Admin": "Admin not found."})


# DELETE : Delete admin given username and id
@app.route('/admin/<int:a_id>', methods=['DELETE'])
@admin_only
def deleteAdmin(a_id):
    admin = Admins.query.get(a_id)
    if admin:
        db.session.delete(admin)
        db.session.commit()
        return jsonify({"Admin": "Admin is deleted."})
    else:
        return jsonify({"Admin": "Admin not found."})


''' ################################################ AWARDS ################################################ '''


# GET : Get all awards careated by user id
@app.route('/user/<int:u_id>/award', methods=['GET'])
@jwt_required
def getAwardByUser(u_id):
    user = Users.query.get(u_id)
    if user:
        awardSchema = AwardSchema(many=True)
        query = Awards.query.filter_by(created_by_user=u_id)
        return awardSchema.jsonify(query)
    else:
        return jsonify({"User": "User does not exist."})



# POST : Create new award
# NEED TO CHECK IF RECIPENT IS IN THE DB
@app.route('/user/<int:u_id>/award', methods=['POST'])
@user_only
def postAward(u_id):
    user = Users.query.get(u_id)
    if user:
        awardSchema = AwardSchema()
        newAward = Awards(request.json['award_type'],
                          request.json['first_name'],
                          request.json['last_name'],
                          request.json['time_granted'],  # 00:00:00
                          request.json['date_granted'],  # yyyy-mm-dd
                          u_id)
        db.session.add(newAward)
        db.session.commit()

        # Create Award
        generateAward(newAward, user)
        
        return awardSchema.jsonify(newAward)
    else:
        return jsonify({"User": "User does not exist. Cannot create award."})


# DELETE : Delete award created by user
@app.route('/user/<int:u_id>/award/<int:aw_id>', methods=['DELETE'])
@jwt_required
def deleteAward(u_id, aw_id):
    award = Awards.query.filter_by(id=aw_id, created_by_user=u_id).first()
    if award:
        db.session.delete(award)
        db.session.commit()
        return jsonify({"Award": "Award is deleted."})
    else:
        return jsonify({"Error": "User or award does not exist."})


''' ################################################ SEND MAIL ################################################ '''


def generateAward(newAward, authorizedUser):
  
    # Latex document sections
    header = r'''\documentclass{article}
            \begin{document}
            \begin{center}
            '''

    footer = r'''   \end{center}
                    \end{document}'''


    awardTypeSection = r'''\begin{center}{\huge\textbf{''' + 'Employee of the ' + str(newAward.award_type) + r'''}}\end{center}'''

    inputDate = r'''\begin{center}{\large\textbf{''' + str(newAward.date_granted) + r'''}}\end{center}'''

    recipeint = r'''\begin{center}{\Huge\textbf{''' + str(newAward.recipient_first_name) + ' ' + str(newAward.recipient_last_name) + r'''}}\end{center}'''

    to_section = r'''\begin{center}{\large\textbf{''' + 'To' + r'''}}\end{center}'''


    # Construct latex file
    content = header + \
              awardTypeSection + \
              inputDate + \
              to_section + \
              recipeint + \
              footer


    # Generate pdf file
    with open('awardPDF.tex', 'w') as f:
        f.write(content)

    commandLine = subprocess.Popen(['pdflatex', 'awardPDF.tex'])
    commandLine.communicate()


    # Get recipient's email address (username)
    recipient_email = check_user_in_db(newAward.recipient_first_name, newAward.recipient_last_name)


    # Send email
    try:
        msg = Message("Employee Portal",
                      sender='ogmaemployeeawards@gmail.com',
                      recipients=[recipient_email])
        msg.body = "Congrats on the award!!!\n"

        with app.open_resource("awardPDF.pdf") as fp:
            msg.attach("awardPDS.pdf", "award/pdf",fp.read())

        mail.send(msg)

    # Error with sending email
    except Exception as e:
        print str(e)

    # Clean up files
    os.unlink('awardPDF.aux')
    os.unlink('awardPDF.log')
    os.unlink('awardPDF.tex')
    # os.unlink('awardPDF.pdf') !!! DON'T FORGET TO UNCOMMENT !!!


@app.route('/send-mail/')
def send_mail():
    try:
        msg = Message("Hey!!!",
                      sender='ogmaemployeeawards@gmail.com',
                      recipients=['tonp@oregonstate.edu'])
        msg.body = "Congrats on the award!"
        mail.send(msg)
        return 'Mail sent!!!'


    except Exception as e:
        return str(e)


''' ################################################ LOGIN ################################################ '''


@app.route('/admin/login', methods=['POST'])
def adminLogin():
    admin = Admins.query.filter_by(admin_name=request.json['username']).first()
    # Authenticate
    if admin and bcrypt.check_password_hash(admin.admin_password, request.json['password']):
        access_token = create_access_token(identity=admin.admin_name)
        return jsonify(access_token=access_token, id=admin.id), 200
    else:
        return jsonify({"Credentials": "Wrong Credentials."}), 400


@app.route('/user/login', methods=['POST'])
def userLogin():
    user = Users.query.filter_by(user_name=request.json['username']).first()
    # Authenticate
    if user and bcrypt.check_password_hash(user.user_password, request.json['password']):
        access_token = create_access_token(user.user_name)
        return jsonify(access_token=access_token, id=user.id), 200
    else:
        return jsonify({"Credentials": "Wrong Credentials."}), 400


''' ################################################ BI REPORT ################################################ '''


# GET : Retrieve BI report and return in json format
@app.route('/bi/report', methods=['GET'])
@admin_only
def getBIReport():
    totalAdmin = Admins.query.count()
    totalUser = Users.query.count()
    totalAward = Awards.query.count()
    totalEmpMonth = Awards.query.filter_by(award_type='Employee of the Month').count()
    totalEmpWeek = Awards.query.filter_by(award_type='Employee of the Week').count()

    # Users that has the most awards - descending
    userWithMostAwards_Total = db.session.query(Users.first_name, Users.last_name, func.count(Awards.award_type)) \
        .join(Awards, Users.first_name == Awards.recipient_first_name) \
        .group_by(Users.first_name, Users.last_name) \
        .order_by(func.count(Awards.award_type) \
        .desc()).all()

    userWithMostAwards_Month = db.session.query(Users.first_name, Users.last_name, func.count(Awards.award_type)) \
        .join(Awards, Users.first_name == Awards.recipient_first_name) \
        .filter(Awards.award_type=='Employee of the Month') \
        .group_by(Users.first_name, Users.last_name, Awards.award_type) \
        .order_by(func.count(Awards.award_type) \
        .desc()).all()

    userWithMostAwards_Week = db.session.query(Users.first_name, Users.last_name, func.count(Awards.award_type)) \
        .join(Awards, Users.first_name == Awards.recipient_first_name) \
        .filter(Awards.award_type=='Employee of the Week') \
        .group_by(Users.first_name, Users.last_name, Awards.award_type) \
        .order_by(func.count(Awards.award_type) \
        .desc()).all()


    # User that granted the most awards - descending
    userGrantedMostAwards_Total = db.session.query(Users.first_name, Users.last_name, func.count(Awards.created_by_user)) \
        .join(Awards, Users.id == Awards.created_by_user) \
        .group_by(Users.first_name, Users.last_name) \
        .order_by(func.count(Awards.created_by_user) \
        .desc()).all()

    userGrantedMostAwards_Month = db.session.query(Users.first_name, Users.last_name, func.count(Awards.created_by_user)) \
        .join(Awards, Users.id == Awards.created_by_user) \
        .filter(Awards.award_type=='Employee of the Month') \
        .group_by(Users.first_name, Users.last_name) \
        .order_by(func.count(Awards.created_by_user) \
        .desc()).all()

    userGrantedMostAwards_Week = db.session.query(Users.first_name, Users.last_name, func.count(Awards.created_by_user)) \
        .join(Awards, Users.id == Awards.created_by_user) \
        .filter(Awards.award_type=='Employee of the Week') \
        .group_by(Users.first_name, Users.last_name) \
        .order_by(func.count(Awards.created_by_user) \
        .desc()).all()

    return jsonify({"totalAdmin": totalAdmin,
                    'totalUser': totalUser,
                    'totalAward': totalAward,
                    'totalEmpMonth': totalEmpMonth,
                    'totalEmpWeek': totalEmpWeek,
                    'userWithMostAwards': {"total":userWithMostAwards_Total, 
                                           "month": userWithMostAwards_Month, 
                                           "week": userWithMostAwards_Week},
                    'userGrantedMostAwards': {"total": userGrantedMostAwards_Total, 
                                              "month": userGrantedMostAwards_Month, 
                                              "week": userGrantedMostAwards_Week}
                    })


''' ################################################ ERROR HANDLING ################################################ '''


# Error handlers for exceptions
@app.errorhandler(Exception)
def bad_request(error):
    if isinstance(error, HTTPException):
        return jsonify(str(error)), error.code
    else:
        return jsonify({"Error": "500 - Internal Server"}), 500


if __name__ == '__main__':
    app.run(debug=True)
