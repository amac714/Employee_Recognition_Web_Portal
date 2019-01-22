from flask import Flask, jsonify, request, json
from datetime import datetime
from flask_cors import CORS
#from flask_bcrypt import Bcrypt #bcrypt is for hashing passwords
from flask_sqlalchemy import SQLAlchemy
#from flask_jwt_extended import JWTManager #jwt is for web tokens/authentication
#from flask_jwt_extended import create_access_token

app = Flask(__name__)

CORS(app)

#this route can be deleted or changed
@app.route('/')
def index():
  return jsonify({'data': 'Hello Ogma'})

if __name__ == '__main__':
  app.run(debug=True)
