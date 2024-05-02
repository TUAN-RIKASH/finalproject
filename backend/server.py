from flask import Flask
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from dotenv import load_dotenv
import os
from routes.employee_routes import employee_blueprint as blueprint_employee
from routes.voice_routes import voice_blueprint as blueprint_voice
from routes.voice_emotion_routes import voice_emotion_blueprint as blueprint_emotion
from routes.admin_routes import admin_blueprint as blueprint_admin

# Load environment variables from .env file
load_dotenv()

web_app = Flask(__name__)

# Configuration settings
web_app.config['MONGODB_SETTINGS'] = {
    'db': os.getenv('MONGO_DB_NAME'), 
    'host': os.getenv('MONGO_URI')
}
web_app.config['SECRET_KEY'] = os.getenv('JWT_SECRET')

database = MongoEngine(web_app)
CORS(web_app)

# Registering blueprints with URL prefixes
web_app.register_blueprint(blueprint_employee, url_prefix='/api/employee')
web_app.register_blueprint(blueprint_voice, url_prefix='/api/voice')
web_app.register_blueprint(blueprint_emotion, url_prefix='/api/emotion')
web_app.register_blueprint(blueprint_admin, url_prefix='/api/admin')

@web_app.route('/')
def home():
    return "system is running..."

if __name__ == '__main__':
    web_app.run(port=int(os.getenv('PORT', 3001)), debug=True)
