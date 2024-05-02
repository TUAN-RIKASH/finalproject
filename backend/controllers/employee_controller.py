from flask import jsonify, request
from models.employee import Employee

def create_employee():
    data = request.json
    employee = Employee(**data)
    employee.save()
    return jsonify({"message": "Employee saved successfully", "id": str(employee.id)}), 200

def get_all_employees():
    employees = Employee.objects.all() 
    if employees:
        employees_data = []
        for employee in employees:
            employee_dict = {
                'id': str(employee.id),  
                'name': employee.name,
                'date_of_birth': employee.date_of_birth.isoformat() if employee.date_of_birth else None, 
                'department': employee.department,
                'address': employee.address,
                'contact_number': employee.contact_number,
            }
            employees_data.append(employee_dict)
        return jsonify(employees_data), 200
    else:
        return jsonify({"message": "No employees found"}), 404

def get_employee(id):
    employee = Employee.objects(id=id).first()
    if employee:
        return jsonify({
            'id': str(employee.id),
            'name': employee.name,
            'date_of_birth': employee.date_of_birth.isoformat() if employee.date_of_birth else None,
            'department': employee.department,
            'address': employee.address,
            'contact_number': employee.contact_number,
        }), 200
    else:
        return jsonify({"error": "Employee not found"}), 404

def update_employee(id):
    data = request.json
    employee = Employee.objects(id=id).first()
    if employee:
        employee.update(**data)
        return jsonify({"message": "Employee updated successfully"}), 200
    else:
        return jsonify({"error": "Employee not found"}), 404

def delete_employee(id):
    employee = Employee.objects(id=id).first()
    if employee:
        employee.delete()
        return jsonify({"message": "Employee deleted successfully"}), 200
    else:
        return jsonify({"error": "Employee not found"}), 404
