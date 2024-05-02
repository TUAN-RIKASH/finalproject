from flask import Blueprint
from controllers.voice_controller import train_model, predict_emotion

voice_blueprint = Blueprint('voice_blueprint', __name__)

@voice_blueprint.route('/train', methods=['POST'])
def perform_training():
    response, status_code = train_model()
    return response, status_code

@voice_blueprint.route('/predict', methods=['POST'])
def make_prediction():
    response, status_code = predict_emotion()
    return response, status_code
