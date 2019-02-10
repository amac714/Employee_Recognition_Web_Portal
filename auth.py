from functools import wraps
from flask_jwt_extended import (JWTManager,jwt_required,verify_jwt_in_request,get_jwt_claims,create_access_token,get_jwt_identity)
from flask import jsonify
from models import Users,Admins,Awards
from app import jwt

def admin_only(f):
    @wraps(f)
    def checkRole(*args, **kwargs):
        verify_jwt_in_request()
        claim = get_jwt_claims()
        if claim['role'] != 'admin':
            return jsonify({'Forbidden' : 'Admins only.'}), 403
        else:
            return f(*args, **kwargs)
    return checkRole

def user_only(f):
    @wraps(f)
    def checkRole(*args, **kwargs):
        verify_jwt_in_request()
        claim = get_jwt_claims()
        if claim['role'] != 'user':
            return jsonify({'Forbidden' : 'Users only.'}), 403
        else:
            return f(*args, **kwargs)
    return checkRole

@jwt.unauthorized_loader
def no_token_callback(s): 
  return jsonify({"Fobidden" : "Please login as admin or user."}), 401

@jwt.expired_token_loader
def session_ended(s): 
  return jsonify({"Session" : "Your session has ended. Please log back in."}), 401

@jwt.user_claims_loader
def add_claims_to_access_token(identity):
  role = ''
  if Admins.query.filter_by(admin_name=identity).first(): 
    role = 'admin'
  else: 
    role = 'user'
  return {
    'user': identity, 
    'role': role
  }