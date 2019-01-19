# Ogma Employee Portal

## Description

As the CS467 capstone project for team Ogma, we are building an online application serving as a tool for creating and managing employee recognition awards.

## Dependencies

Python - flask, flask-cors, flask-sqlalchemy, flask-bcrypt, flask-jwt-extended
React - axios, bootstrap, react-router-dom, reactstrap

For python, its suggested to use a virtual environment whenever working on the project.
I used pipenv. Its pretty easy to set up and you can start it with the command pipenv shell. 

To install the dependencies:
For python:
```
pipenv install flask flask-cors flask-sqlalchemy flask-bcrypt flask-jwt-extended
```
For react (make sure to cd into the client folder before running command):
```
yarn add axios bootstrap react-router-dom reactstrap (note: you can also use npm install --save instead of yarn add)
```
Note: flask-bcrypt is used to hash passwords and flask-jwt-extended is json web token for flask & used for authentication
Also, you don't need to be in the virtual environment when working on the client side

## Authors
Alan Macabuhay

Brian Phair

Phung Ton 
