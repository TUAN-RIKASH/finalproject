from flask import Blueprint
from controllers.employee_controller import create_employee, get_employee, update_employee, delete_employee,get_all_employees

employee_blueprint = Blueprint('employee_blueprint', __name__)

# Create routes with the blueprint
employee_blueprint.route('/create', methods=['POST'])(create_employee)
employee_blueprint.route('/get/<id>', methods=['GET'])(get_employee)
employee_blueprint.route('/update/<id>', methods=['PUT'])(update_employee)
employee_blueprint.route('/delete/<id>', methods=['DELETE'])(delete_employee)
employee_blueprint.route('/all', methods=['GET'])(get_all_employees) 