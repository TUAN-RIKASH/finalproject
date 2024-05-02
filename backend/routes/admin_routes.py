from flask import Blueprint
from controllers.admin_controller import authenticate_user

admin_blueprint = Blueprint('admin_blueprint', __name__)

# Create routes with the blueprint
admin_blueprint.route('/login', methods=['POST'])(authenticate_user)
