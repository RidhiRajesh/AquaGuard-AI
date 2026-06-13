import joblib

feature_columns = joblib.load("models/feature_columns.pkl")

print(feature_columns)