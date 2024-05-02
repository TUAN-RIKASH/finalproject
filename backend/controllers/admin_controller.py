from flask import jsonify, request
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def authenticate_user():
    user_input = request.json
    if not user_input or 'username' not in user_input or 'password' not in user_input:
        return jsonify({"error": "Invalid JSON body"}), 400

    # Verify if username and password are correct
    valid_username = os.getenv('ADMIN_USERNAME')
    valid_password = os.getenv('ADMIN_PASSWORD')
    if user_input['username'] == valid_username and user_input['password'] == valid_password:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401
