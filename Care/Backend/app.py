import os
import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
import logging

# Configuration de l'enregistrement des logs
logging.basicConfig(level=logging.INFO)

# Initialisation de l'application Flask
app = Flask(__name__)
CORS(app, resources={r"/predict/*": {"origins": "http://localhost:3000"}})

# Chargement des modèles
diabetes_model = pickle.load(open(os.path.join('saved_models', 'diabetes_model.sav'), 'rb'))
heart_disease_model = pickle.load(open(os.path.join('saved_models', 'heart_disease_model.sav'), 'rb'))
parkinsons_model = pickle.load(open(os.path.join('saved_models', 'parkinsons_model.sav'), 'rb'))
stroke_model = load('./avc/avc_prediction_model.joblib')

# Routes de prédiction pour chaque modèle

@app.route('/predict/diabetes', methods=['POST'])
def predict_diabetes():
    data = request.json
    user_input = [[
        data['Pregnancies'], data['Glucose'], data['BloodPressure'],
        data['SkinThickness'], data['Insulin'], data['BMI'],
        data['DiabetesPedigreeFunction'], data['Age']
    ]]
    prediction = diabetes_model.predict(user_input)
    return jsonify({"diagnosis": "The person is diabetic" if prediction[0] == 1 else "The person is not diabetic"})

@app.route('/predict/heart', methods=['POST'])
def predict_heart_disease():
    data = request.json
    try:
        required_keys = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']
        for key in required_keys:
            if key not in data:
                return jsonify({'error': f'Missing key: {key}'}), 400

        input_data = np.array([
            float(data['age']), float(data['sex']), float(data['cp']), float(data['trestbps']),
            float(data['chol']), float(data['fbs']), float(data['restecg']), float(data['thalach']),
            float(data['exang']), float(data['oldpeak']), float(data['slope']),
            float(data['ca']), float(data['thal'])
        ]).reshape(1, -1)

        prediction = heart_disease_model.predict(input_data)
        return jsonify({'diagnosis': "Risk of Heart Disease" if prediction[0] == 1 else "No Risk of Heart Disease"})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/predict/pk', methods=['POST'])
def predict_parkinsons():
    data = request.json
    user_input = [data['fo'], data['fhi'], data['flo'], data['Jitter_percent'], data['Jitter_Abs'],
                  data['RAP'], data['PPQ'], data['DDP'], data['Shimmer'], data['Shimmer_dB'],
                  data['APQ3'], data['APQ5'], data['APQ'], data['DDA'], data['NHR'],
                  data['HNR'], data['RPDE'], data['DFA'], data['spread1'], data['spread2'],
                  data['D2'], data['PPE']]
    prediction = parkinsons_model.predict([user_input])

    result = "The person has Parkinson's disease" if prediction[0] == 1 else "The person does not have Parkinson's disease"
    return jsonify({'diagnosis': result})

@app.route('/predict/avc', methods=['POST'])
def predict_stroke():
    try:
        data = request.json
        required_fields = ['gender', 'age', 'hypertension', 'heart_disease',
                           'ever_married', 'work_type', 'Residence_type',
                           'avg_glucose_level', 'bmi', 'smoking_status']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        df = pd.DataFrame([data])
        prediction = stroke_model.predict(df)[0]
        
        logging.info(f"Prediction: {prediction}")
        
        return jsonify({"stroke": int(prediction)}), 200

    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "Welcome to the Combined Prediction API"

# Lancement de l'application Flask
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)