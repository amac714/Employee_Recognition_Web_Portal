from flask import Flask, jsonify, request, json
# from datetime import datetime
from flask_cors import CORS
#from flask_bcrypt import Bcrypt #bcrypt is for hashing passwords
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
#from flask_jwt_extended import JWTManager #jwt is for web tokens/authentication
#from flask_jwt_extended import create_access_token
import datetime
import os

app = Flask(__name__)

CORS(app)
app.config.from_object(os.environ['APP_SETTINGS'])
db = SQLAlchemy(app)
marsh = Marshmallow(app)

from models import Users,Admins,Awards,UserSchema,AdminSchema,AwardSchema

adminSchema = AdminSchema()

#this route can be deleted or changed
@app.route('/')
def index():
    return jsonify({'data': 'Hello Ogma'})

# POST : Create new user 
# PUT : Update user first and last name
# DELETE : Delete user given id and username
@app.route('/user', methods=['POST','PUT','DELETE'])
def user():
    if request.method == 'POST':

      newUser = Users(request.json['username'],
                      request.json['password'],
                      request.json['first_name'],
                      request.json['last_name'],
                      request.json['sig'])
      db.session.add(newUser)
      db.session.commit()

      return jsonify(newUser)

    elif request.method == 'PUT':

      user = Users.query.filter(id=request.json['id'], 
                                user_name=request.json['username'])
      user.first_name = request.json['first_name']
      user.last_name = request.json['last_name']
      db.session.commit()
      return jsonify(user)

    elif request.method == 'DELETE': 

      query = Users.query.filter(id=request.json['id'], 
                                user_name=request.json['username']).first()
      query.delete()
      db.commit()
      return jsonify({"User is deleted"})


# POST : Create new admin
# PUT : Update admin username and password
# DELETE : Delete admin given username and id
@app.route('/admin', methods=['POST','PUT','DELETE'])
def admin():
    if request.method == 'POST':

      newAdmin = Admins(request.json['username'],
                      request.json['password'])
      db.session.add(newAdmin)
      db.session.commit()

      return adminSchema.jsonify(newAdmin)

    elif request.method == 'PUT':

      admin = Admin.query.filter(id=request.json['id'], 
                                user_name=request.json['username'])
      admin.admin_name = request.json['admin_name']
      admin.admin_password = request.json['password']
      db.session.commit()
      return jsonify(admin)

    elif request.method == 'DELETE': 

      query = Admin.query.filter(id=request.json['id'], 
                                user_name=request.json['admin_name']).first()
      query.delete()
      db.commit()
      return jsonify({"Admin is deleted"})


if __name__ == '__main__':
  
  app.run(debug=True)
