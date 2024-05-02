from flask import Blueprint, request
from controllers.voice_emotion_controller import create_emotion_record, get_emotion_record, update_emotion_record, delete_emotion_record, get_all_emotion_records

voice_emotion_blueprint = Blueprint('voice_emotion_blueprint', __name__)

@voice_emotion_blueprint.route('/create', methods=['POST'])
def create():
    data = request.get_json()
    return create_emotion_record(data['employee_id'], data['date'], data['status'])

@voice_emotion_blueprint.route('/all', methods=['GET'])
def get_all():
    return get_all_emotion_records()

@voice_emotion_blueprint.route('/<record_id>', methods=['GET'])
def read(record_id):
    return get_emotion_record(record_id)

@voice_emotion_blueprint.route('/<record_id>', methods=['PUT'])
def update(record_id):
    status = request.get_json().get('status')
    return update_emotion_record(record_id, status)

@voice_emotion_blueprint.route('/<record_id>', methods=['DELETE'])
def delete(record_id):
    return delete_emotion_record(record_id)
