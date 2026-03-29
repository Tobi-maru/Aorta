from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import os
import json

app = Flask(__name__)
CORS(app)

model_path = os.path.join(os.path.dirname(__file__), "heart_model.pkl")
model = pickle.load(open(model_path, "rb"))

FEATURE_NAMES = [
    "age",
    "sex",
    "cp",
    "trestbps",
    "chol",
    "restecg",
    "thalach",
    "exang",
    "oldpeak",
    "slope",
    "ca",
    "thal",
]


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        for feature in FEATURE_NAMES:
            if feature not in data:
                return jsonify({"error": f"Missing feature: {feature}"}), 400

        input_data = [[float(data[f]) for f in FEATURE_NAMES]]

        prediction = model.predict(input_data)
        probability = model.predict_proba(input_data)[0][1]

        return jsonify(
            {
                "prediction": int(prediction[0]),
                "probability": round(float(probability) * 100, 2),
                "risk": "High Risk" if prediction[0] == 1 else "Low Risk",
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
