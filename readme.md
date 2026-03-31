# ❤️ Heart Disease Prediction using Random Forest

## 📌 Project Overview
This project predicts the likelihood of heart disease using patient medical attributes.

The goal is to build a simple, interpretable, and generalized machine learning model that can assist in early risk detection.

## 🚀 Tech Stack
- React / Vite
- Flask API
- Python
- Scikit-learn
- Pandas
- Random Forest

## 📊 Dataset Features
The model was trained on 12 medical features:

- Age
- Sex
- Chest Pain Type (cp)
- Resting Blood Pressure (trestbps)
- Cholesterol (chol)
- Resting ECG (restecg)
- Maximum Heart Rate (thalach)
- Exercise Induced Angina (exang)
- ST Depression (oldpeak)
- Slope of the Peak Exercise ST Segment (slope)
- Number of Major Vessels (ca)
- Thalassemia (thal)

Target:
- 0 = No Heart Disease
- 1 = Heart Disease

## 🧠 Model Used
- Random Forest
- Class-weight balanced to handle dataset distribution
- Generalization through scaling and regularization

## 📈 Model Performance

- Training Accuracy: ~96%
- Test Accuracy: ~91%
- Evaluated using:
  - Accuracy
  - Confusion Matrix
  - Classification Report

The model was kept simple to avoid overfitting on a small dataset.

## 🎯 Why Random Forest?

- Excellent performance on structured tabular data
- Robust to outliers
- Captures non-linear relationships better than simple linear models
- Provides probability scores for risk assessment

## 🖥️ React & Flask App

An interactive web app allows users to input patient details and receive:
- Predicted risk
- Probability score

To run locally:

1. **Start the Flask Backend:**
```bash
python api.py
```

2. **Start the React Frontend:**
```bash
cd frontend
npm install
npm run dev
```