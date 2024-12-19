from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.ensemble import RandomForestClassifier 
from sklearn.model_selection import RepeatedStratifiedKFold, cross_val_score
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, PowerTransformer
from sklearn.impute import SimpleImputer
from imblearn.pipeline import Pipeline
from imblearn.over_sampling import SMOTE
import pandas as pd
import numpy as np
from joblib import dump
import matplotlib.pyplot as plt


def load_data():
    df = pd.read_csv('./stroke-data.csv')
    df = df.drop('id', axis=1)  # Suppression de l'ID qui n'est pas pertinent pour la prédiction
    categorical = ['hypertension', 'heart_disease', 'ever_married', 'work_type', 'Residence_type', 'smoking_status']
    numerical = ['avg_glucose_level', 'bmi', 'age']
    y = df['stroke']
    X = df.drop('stroke', axis=1)  # X correspond aux features, y à la cible (stroke)
    return X, y, categorical, numerical


def evaluate_model(X, y, model):
    cv = RepeatedStratifiedKFold(n_splits=10, n_repeats=3, random_state=42)
    scores = cross_val_score(model, X, y, scoring='roc_auc', cv=cv, n_jobs=-1)
    return scores


# Chargement des données
X, y, categorical, numerical = load_data()
print(X.shape, y.shape)

# Définition du modèle LDA
model = RandomForestClassifier()

# Préparation du pipeline avec les transformations
transformer = ColumnTransformer(transformers=[
    ('imp', SimpleImputer(strategy='median'), numerical),  # Imputation des valeurs manquantes pour les colonnes numériques
    ('o', OneHotEncoder(handle_unknown='ignore'), categorical)  # Encodage OneHot pour les colonnes catégorielles
])

pipeline = Pipeline(steps=[
    ('t', transformer),
    ('p', PowerTransformer(method='yeo-johnson', standardize=True)),  # Transformation des données numériques
    ('over', SMOTE()),  # Rééquilibrage des classes avec SMOTE
    ('m', model)
])

# Évaluation du modèle
scores = evaluate_model(X, y, pipeline)
print('RDF %.3f (%.3f)' % (np.mean(scores), np.std(scores)))

# Affichage des résultats de la validation croisée
plt.boxplot([scores], labels=['RDF'], showmeans=True)
plt.show()

# Entraînement du modèle sur l'ensemble des données
pipeline.fit(X, y)

# Sauvegarde du pipeline entraîné
dump(pipeline, 'avc_prediction_model.joblib')