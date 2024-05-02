from models.voice_emotion import VoiceEmotion
from models.employee import Employee
from mongoengine import DoesNotExist, ValidationError
from flask import jsonify

def create_emotion_record(employee_id, date, status):
    try:
        employee = Employee.objects.get(id=employee_id)
        emotion_record = VoiceEmotion(
            employee=employee,
            date=date,
            status=status
        )
        emotion_record.save()
        return jsonify(emotion_record), 201
    except DoesNotExist:
        return jsonify({"error": "Employee not found"}), 404
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    
def get_all_emotion_records():
    try:
        # Retrieve all emotion records from the database
        records = VoiceEmotion.objects.all()

        # Convert emotion records to JSON format
        records_json = jsonify(records)

        # Return the JSON response
        return records_json, 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_emotion_record(record_id):
    try:
        record = VoiceEmotion.objects.get(id=record_id)
        return jsonify(record), 200
    except DoesNotExist:
        return jsonify({"error": "Record not found"}), 404

def update_emotion_record(record_id, status):
    try:
        record = VoiceEmotion.objects.get(id=record_id)
        record.update(status=status)
        return jsonify({"message": "Record updated successfully"}), 200
    except DoesNotExist:
        return jsonify({"error": "Record not found"}), 404
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400

def delete_emotion_record(record_id):
    try:
        record = VoiceEmotion.objects.get(id=record_id)
        record.delete()
        return jsonify({"message": "Record deleted successfully"}), 200
    except DoesNotExist:
        return jsonify({"error": "Record not found"}), 404
