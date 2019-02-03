from flask import Flask, jsonify, request, json, render_template
from flask_cors import CORS
#from flask_bcrypt import Bcrypt #bcrypt is for hashing passwords
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import datetime
#from flask_jwt_extended import JWTManager #jwt is for web tokens/authentication
#from flask_jwt_extended import create_access_token
from werkzeug.exceptions import HTTPException
import os

app = Flask(__name__, template_folder="client/build", static_folder="client/build/static")

CORS(app)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
marsh = Marshmallow(app)

from models import Users,Admins,Awards,UserSchema,AdminSchema,AwardSchema

# Main Portal
@app.route('/')
def index():
    return render_template('index.html')


''' ######################## USERS ######################## '''      


# GET : Get all user
@app.route('/user',methods=['GET'])
def getAllUser(): 
    users = Users.query.all()
    schema = UserSchema(many=True)    
    return jsonify(schema.dump(users).data)


# GET : Get individual user
@app.route('/user/<int:u_id>',methods=['GET'])
def getIndUser(u_id): 
    user = Users.query.get(u_id)
    if user:
      schema = UserSchema()    
      return jsonify(schema.dump(user).data)
    else: 
      return jsonify({"User": "User not found."})


# POST : Create new user 
@app.route('/user', methods=['POST'])
def postUser():
    user = UserSchema()
    newUser = Users(request.json['username'],
                      request.json['password'],
                      request.json['first_name'],
                      request.json['last_name'],
                      request.files['sig'].read())

    db.session.add(newUser)
    db.session.commit()
    return user.jsonify(newUser)


# PATCH : Update user first and last name
@app.route('/user/<int:u_id>', methods=['PATCH'])
def patchUser(u_id):

    user = Users.query.get(u_id)
    if user:
      schema = UserSchema()
      user.first_name = request.form['first_name']
      user.last_name = request.form['last_name']
      db.session.commit()
      return schema.jsonify(user)
    else: 
      return jsonify({"User": "User not found."})


# DELETE : Delete user given id 
@app.route('/user/<int:u_id>', methods=['DELETE'])
def deleteUser(u_id):

    user = Users.query.get(u_id)
    if user:
      db.session.delete(user)
      db.session.commit()
      return jsonify({"User":"User is deleted"})
    else: 
      return jsonify({"User": "User not found."})


''' ######################## ADMINS ######################## ''' 


# GET : Get all admin
@app.route('/admin',methods=['GET'])
def getAllAdmin(): 
    admins = Admins.query.all()
    schema = AdminSchema(many=True)    
    return jsonify(schema.dump(admins).data)


# GET : Get individual admin
@app.route('/admin/<int:a_id>',methods=['GET'])
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
    newAdmin = Admins(request.json['admin_name'],
                      request.json['password'])
    db.session.add(newAdmin)
    db.session.commit()
    return adminSchema.jsonify(newAdmin)


# PATCH : Update admin username and password
@app.route('/admin/<int:a_id>', methods=['PATCH'])
def patchAdmin(a_id):

    admin = Admins.query.get(a_id)
    if admin:
      adminSchema = AdminSchema()
      admin.admin_name = request.json['admin_name']
      admin.admin_password = request.json['password']
      db.session.commit()
      return adminSchema.jsonify(admin)
    else: 
      return jsonify({"Admin": "Admin not found."})


# DELETE : Delete admin given username and id
@app.route('/admin/<int:a_id>', methods=['DELETE'])
def deleteAdmin(a_id):

    admin = Admins.query.get(a_id)
    if admin:
      db.session.delete(admin)
      db.session.commit()
      return jsonify({"Admin": "Admin is deleted."})
    else: 
      return jsonify({"Admin": "Admin not found."})


''' ######################## AWARDS ######################## ''' 


# GET : Get all awards careated by user id
@app.route('/user/<int:u_id>/award', methods=['GET'])
def getAwardByUser(u_id):
    user = Users.query.get(u_id)
    if user:
      awardSchema = AwardSchema(many=True)
      query = Awards.query.filter_by(created_by_user=u_id)
      return awardSchema.jsonify(query)
    else: 
      return jsonify({"User": "User does not exist."})


# POST : Create new award
@app.route('/user/<int:u_id>/award', methods=['POST'])
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
      return awardSchema.jsonify(newAward)
    else: 
      return jsonify({"User": "User does not exist. Cannot create award."})


# DELETE : Delete award created by user
@app.route('/user/<int:u_id>/award/<int:aw_id>', methods=['DELETE'])
def deleteAward(u_id,aw_id):
    
    award = Awards.query.filter_by(id=aw_id, created_by_user=u_id).first()
    if award:
      db.session.delete(award)
      db.session.commit()
      return jsonify({"Award": "Award is deleted."})
    else: 
      return jsonify({"Error": "User or award does not exist."})



# Error handlers for exceptions
@app.errorhandler(Exception)
def bad_request(error): 
  if isinstance(error,HTTPException): 
    return jsonify(str(error)),error.code
  else: 
    return jsonify({"Error": "500 - Internal Server"}),500

if __name__ == '__main__':
  app.run(debug=True)
