import os
from flask import Flask, request, jsonify
import librosa
import numpy as np
from tensorflow.keras.models import load_model
from sklearn.preprocessing import LabelEncoder
from ai_model_data.train import start_train
import logging
import io

# Setup logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# Define paths to the model and label encoder
MODEL_PATH = 'ai_model_data/emotion_recognition_model.h5'
LABEL_ENCODER_PATH = 'ai_model_data/label_encoder_classes.npy'

# Load the trained model and label encoder
try:
    model = load_model(MODEL_PATH)
    label_encoder = LabelEncoder()
    label_encoder.classes_ = np.load(LABEL_ENCODER_PATH)
    logging.info("Model and label encoder loaded successfully.")
except Exception as e:
    logging.error("Failed to load model or label encoder: %s", e)
    raise

def extract_features(audio_data):
    """ Extract MFCC features from an audio file. """
    try:
        # Load audio data with librosa directly from byte data
        audio, sample_rate = librosa.load(io.BytesIO(audio_data), sr=22050, res_type='kaiser_fast')
        mfcc = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=13)
        mfcc_scaled = np.mean(mfcc.T, axis=0)
        logging.info("Features extracted successfully.")
        return mfcc_scaled
    except Exception as e:
        logging.error("Failed to extract features: %s", e)
        raise

def train_model():
    try:
        start_train()
        return {"status": "success", "message": "Model training completed successfully."}, 200
    except Exception as e:
        logging.error("Error training model: %s", e)
        return {"status": "error", "message": str(e)}, 500



def predict_emotion():
    """ Predict emotion from an uploaded audio file. """
    if 'file' not in request.files:
        logging.warning("No file uploaded.")
        return jsonify({"status": "error", "message": "No file uploaded."}), 400

    uploaded_file = request.files['file']
    if uploaded_file.filename == '':
        logging.warning("No file selected.")
        return jsonify({"status": "error", "message": "No file selected."}), 400

    try:
        # Read file data directly from the uploaded file object
        audio_data = uploaded_file.read()
         # Save the audio data to a temporary WAV file
        temp_folder = os.path.join(os.getcwd(), 'temp')
        if not os.path.exists(temp_folder):
            os.makedirs(temp_folder)
            
        temp_file_path = os.path.join(temp_folder, 'temp.wav')
        with open(temp_file_path, 'wb') as f:
            f.write(audio_data)

        # Extract features from the audio data
        feature = extract_features(audio_data)

        # Prepare for prediction
        feature_reshaped = np.expand_dims(np.expand_dims(feature, axis=0), axis=2)

        # Predict emotion
        predictions = model.predict(feature_reshaped)
        emotion = label_encoder.inverse_transform([np.argmax(predictions)])
        accuracy = float(np.max(predictions))
        logging.info("Emotion predicted: %s with accuracy %f", emotion[0], accuracy)

        return jsonify({"status": "success", "emotion": emotion[0], "accuracy": accuracy}), 200
    except Exception as e:
        logging.error("Error during prediction: %s", e)
        return jsonify({"status": "error", "message": str(e)}), 500


