from flask import Flask, jsonify, request, json
# from datetime import datetime
from flask_cors import CORS
#from flask_bcrypt import Bcrypt #bcrypt is for hashing passwords
from flask_sqlalchemy import SQLAlchemy
#from flask_jwt_extended import JWTManager #jwt is for web tokens/authentication
#from flask_jwt_extended import create_access_token
import datetime

app = Flask(__name__)

CORS(app)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:lionlion@localhost/ogma'
db = SQLAlchemy(app)

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), unique=True)
    user_password  = db.Column(db.String(50), unique=True)
    first_name = db.Column(db.String(50), unique=False) 
    last_name  = db.Column(db.String(50), unique=False)
    timecreated = db.Column(db.Date)
    user_signature = db.Column(db.LargeBinary)

    def __init__(self,username,password,firstname,lastname,sig): 
       self.user_name = username
       self.user_password = password
       self.first_name = firstname
       self.last_name = lastname
       self.timecreated = DateTime()
       self.user_signature = sig

    def __repr__(self): 
        return '<id {}>'.format(self.id)

class Admins(db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True)
    admin_name = db.Column(db.String(50), unique=True)
    admin_password= db.Column(db.String(50), unique=True)

    def __init__(self,adminName,adminPass): 
        self.admin_name = adminName
        self.admin_password=adminPass
    def __repr__(self): 
        return '<id {}>'.format(self.id)

class Awards(db.Model):
    __tablename__ = 'awards'
    id = db.Column(db.Integer, primary_key = True)
    award_type = db.Column(db.String(100))
    recipient_first_name  = db.Column(db.String(100))  
    recipient_last_name = db.Column(db.String(100))
    time_granted = db.Column(db.Time)
    date_granted = db.Column(db.Date)
    created_by_user = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self,type,firstname,lastname,time,date,byuser): 
       self.award_type = type
       self.recipient_first_name = firstname
       self.recipient_last_name = lastname
       self.time_granted = time
       self.date_granded = date
       self.created_by_user = byuser

    def __repr__(self): 
        return '<id {}>'.format(self.id)

#this route can be deleted or changed
@app.route('/')
def index():
    return jsonify({'data': 'Hello Ogma'})

@app.route('/add')
def add():
    admin = Admins('admin1','pass')
    db.session.add(admin)
    db.session.commit()
    return "Data is added"


if __name__ == '__main__':
  db.create_all()
  app.run(debug=True)
