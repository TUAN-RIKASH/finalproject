import os
import librosa
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, LSTM

# Path to the dataset
data_folder = 'ai_model_data/RAVDESS'

# Emotions in the dataset
emotions_dict = {
    '01': 'neutral',
    '02': 'calm',
    '03': 'happy',
    '04': 'sad',
    '05': 'angry',
    '06': 'fearful',
    '07': 'disgust',
    '08': 'surprised'
}

def feature_extraction(file_path):
    audio, sample_rate = librosa.load(file_path, res_type='kaiser_fast')
    mfcc = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=13)
    mfcc_scaled = np.mean(mfcc.T, axis=0)
    return mfcc_scaled

def load_dataset(data_folder):
    x, y = [], []
    for root, dirs, files in os.walk(data_folder):
        for file in files:
            if file.lower().endswith('.wav'):
                file_path = os.path.join(root, file)
                parts = file.split("-")
                if len(parts) > 2:
                    emotion_key = parts[2]
                    if emotion_key in emotions_dict:
                        emotion = emotions_dict[emotion_key]
                        feature = feature_extraction(file_path)
                        x.append(feature)
                        y.append(emotion)
    return np.array(x), np.array(y)

def start_train():
    # Load dataset
    X_data, y_data = load_dataset(data_folder)

    # Encode labels
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y_data)

    # Split dataset
    X_train, X_test, y_train, y_test = train_test_split(X_data, y_encoded, test_size=0.25, random_state=42)

    # Build model
    model = Sequential([
        LSTM(64, return_sequences=True, input_shape=(X_train.shape[1], 1)),
        Dropout(0.5),
        LSTM(64),
        Dropout(0.5),
        Dense(64, activation='relu'),
        Dense(len(np.unique(y_encoded)), activation='softmax')
    ])

    model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

    # Reshape for LSTM layer
    X_train_reshaped = np.expand_dims(X_train, axis=2)
    X_test_reshaped = np.expand_dims(X_test, axis=2)

    # Train
    model.fit(X_train_reshaped, y_train, epochs=30, batch_size=64, validation_data=(X_test_reshaped, y_test))
    test_loss, test_accuracy = model.evaluate(X_test_reshaped, y_test, verbose=1)
    print(f"Test Accuracy: {test_accuracy}")

    # Save the model
    model.save('ai_model_data/emotion_recognition_model.h5')

    # Save the label encoder
    np.save('ai_model_data/label_encoder_classes.npy', label_encoder.classes_)

    # Print confirmation
    print("Model and label encoder saved successfully.")
