from flask import Flask, request, jsonify
import pandas as pd
from joblib import load
from flask_cors import CORS
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

# Chargement du modèle entraîné
model = load('./stroke_prediction_model.joblib')

# Initialisation de l'application Flask
app = Flask(__name__)
CORS(app, resources={r"/predict/*": {"origins": "http://localhost:3001"}})

@app.route('/predict/avc', methods=['POST'])
def predict():
    try:
        # Récupération des données JSON envoyées dans la requête POST
        data = request.json
        
        # Vérification des champs requis
        required_fields = ['gender', 'age', 'hypertension', 'heart_disease', 
                           'ever_married', 'work_type', 'Residence_type', 
                           'avg_glucose_level', 'bmi', 'smoking_status']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400
        
        # Transformation des données dans un DataFrame
        df = pd.DataFrame([data])
        
        # Prédiction du modèle
        prediction = model.predict(df)[0]
        
        logging.info(f"Prediction: {prediction}")
        
        # Retourne la prédiction sous forme de JSON
        return jsonify({"stroke": int(prediction)}), 200
    
    except Exception as e:
        # Gestion des erreurs
        logging.error(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "Welcome to the Stroke Prediction API"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)