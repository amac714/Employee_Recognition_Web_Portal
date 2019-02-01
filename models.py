from datetime import datetime
from app import db, marsh


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), nullable=False, unique=True)
    user_password  = db.Column(db.String(50), nullable=False)
    first_name = db.Column(db.String(50), unique=False) 
    last_name  = db.Column(db.String(50), unique=False)
    timecreated = db.Column(db.DateTime, default=datetime.utcnow)
    user_signature = db.Column(db.LargeBinary, nullable=False)

    awards = db.relationship('Awards', backref='award_by_user', lazy='select')

    def __init__(self,username,password,firstname,lastname,sig): 
       self.user_name = username
       self.user_password = password
       self.first_name = firstname
       self.last_name = lastname
       self.user_signature = sig

    def __repr__(self): 
        return '<id {}>'.format(self.id)

class Admins(db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True)
    admin_name = db.Column(db.String(50), nullable=False, unique=True)
    admin_password= db.Column(db.String(50), nullable=False)

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
       self.date_granted = date
       self.created_by_user = byuser

    def __repr__(self): 
        return '<id {}>'.format(self.id)

class AdminSchema(marsh.ModelSchema): 
    class Meta:
        model = Admins
        include_fk = True

class AwardSchema(marsh.ModelSchema): 
    class Meta:
        model = Awards
        include_fk = True

class UserSchema(marsh.ModelSchema): 
    class Meta:
        fields = ('id','user_name', 'user_password', 'first_name', 'last_name')
        include_fk = True
    awards = marsh.Nested(AwardSchema,many=True)