import os
import sys

import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split


def load_data(file_path):
    """Load the dataset from a CSV file."""
    try:
        df = pd.read_csv(file_path)
    except FileNotFoundError:
        raise FileNotFoundError(f"Data file not found: {file_path}")
    except Exception as exc:
        raise RuntimeError(f"Failed to read data file: {exc}")

    if 'Potability' not in df.columns:
        raise ValueError("Target column 'Potability' is missing from the dataset")

    return df


def preprocess_data(df):
    """Fill missing numeric values and separate features from target."""
    numeric_cols = df.select_dtypes(include=['number']).columns
    df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].median())

    if df[numeric_cols].isnull().any().any():
        raise ValueError("Missing values remain after median imputation")

    X = df.drop(columns=['Potability'])
    y = df['Potability']

    return X, y


def save_object(obj, file_path):
    """Save an object to disk using joblib."""
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    joblib.dump(obj, file_path)


def main():
    data_path = os.path.join('data', 'water_potability.csv')
    model_path = os.path.join('models', 'water_model.pkl')
    feature_path = os.path.join('models', 'feature_columns.pkl')

    try:
        df = load_data(data_path)
        X, y = preprocess_data(df)

        X_train, X_test, y_train, y_test = train_test_split(
            X,
            y,
            test_size=0.2,
            random_state=42,
            stratify=y if y.nunique() > 1 else None,
        )

        model = RandomForestClassifier(random_state=42)
        model.fit(X_train, y_train)

        predictions = model.predict(X_test)
        accuracy = accuracy_score(y_test, predictions)

        print(f"Dataset shape: {df.shape}")
        print(f"Training size: {X_train.shape[0]}")
        print(f"Testing size: {X_test.shape[0]}")
        print(f"Accuracy: {accuracy:.4f}")

        save_object(model, model_path)
        save_object(X.columns.tolist(), feature_path)

    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
