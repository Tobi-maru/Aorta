from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os
import json

import traceback

app = Flask(__name__)
CORS(app)

model = None
model_error = None
try:
    import pickle
    model_path = os.path.join(os.path.dirname(__file__), "heart_model.pkl")
    with open(model_path, "rb") as f:
        model = pickle.load(f)
except Exception as e:
    model_error = f"{str(e)}\n{traceback.format_exc()}"

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
    if model is None:
        return jsonify({"error": f"Failed to load model: {model_error}", "details": model_error}), 500

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
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
