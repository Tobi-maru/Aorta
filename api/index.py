from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os
import json
import traceback

from pure_model import predict_model

app = Flask(__name__)
CORS(app)

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

        input_data = [float(data[f]) for f in FEATURE_NAMES]

        scores = predict_model(input_data)
        probability = scores[1]
        prediction = 1 if probability > 0.5 else 0

        return jsonify(
            {
                "prediction": prediction,
                "probability": round(float(probability) * 100, 2),
                "risk": "High Risk" if prediction == 1 else "Low Risk",
            }
        )

    except Exception as e:
        return jsonify({"error": f"{str(e)}\n{traceback.format_exc()}"}), 500


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
