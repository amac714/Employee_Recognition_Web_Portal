# Ogma Employee Portal

## Description

As the CS467 capstone project for team Ogma, we are building an online application serving as a tool for creating and managing employee recognition awards.

## Dependencies

Python - flask, flask-cors, flask-sqlalchemy, flask-bcrypt, flask-jwt-extended, flask-marshmallow, flask-migrate, flask-script, marshmallow-sqlalchemy, psycopg2-binary

React - axios, bootstrap, react-router-dom, reactstrap

For python, its suggested to use a virtual environment whenever working on the project.
I used pipenv. Its pretty easy to set up and you can start it with the command pipenv shell. 

To install the dependencies:

For python (in root directory):
```
pipenv install  
```
Pipenv will automaticlly install all dependencies listed in the Pipfile. Project will also use PostgreSQL 9.5. Download it [here](https://www.postgresql.org/download/windows/).

For react (make sure to cd into the client folder before running command):
```
yarn add axios bootstrap react-router-dom reactstrap (note: you can also use npm install --save instead of yarn add)
```
Note: flask-bcrypt is used to hash passwords and flask-jwt-extended is json web token for flask & used for authentication
Also, you don't need to be in the virtual environment when working on the client side

## Run Locally

Initialize the database: 
```
1. pipenv run python manage.py db init
2. pipenv run python manage.py db migrate
3. pipenv run python manage.py db upgrade
```
Run server: 
```
1. pipenv run python manage.py runserver
```
Project will run on http://127.0.0.1:5000/.

## Authors
Alan Macabuhay

Brian Phair

Phung Ton 
