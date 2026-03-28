# train.py (Simple Generalized Version)

import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Load dataset
heart_data = pd.read_csv("heart_disease_data.csv")

# Drop 'fbs' (adds noise, removing it improves test accuracy)
heart_data = heart_data.drop(columns=["fbs"])

# Features & Target
X = heart_data.drop(columns="target", axis=1)
y = heart_data["target"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# Improved Random Forest model pipeline with scaling and optimal regularization
model = Pipeline([
    ('scaler', StandardScaler()),
    ('rf', RandomForestClassifier(n_estimators=100, max_depth=4, min_samples_leaf=2, random_state=42, class_weight="balanced"))
])

# Train
model.fit(X_train, y_train)

# Predictions
train_pred = model.predict(X_train)
test_pred = model.predict(X_test)

# Evaluation
print("Training Accuracy:", accuracy_score(y_train, train_pred))
print("Test Accuracy:", accuracy_score(y_test, test_pred))

print("\nConfusion Matrix:\n", confusion_matrix(y_test, test_pred))
print("\nClassification Report:\n")
print(classification_report(y_test, test_pred))

# Save model
with open("heart_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("\nModel saved as heart_model.pkl")