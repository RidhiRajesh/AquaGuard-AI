import pandas as pd
from flask import Blueprint, current_app, jsonify, request

predict_blueprint = Blueprint('predict', __name__)


@predict_blueprint.route('/api/predict', methods=['POST'])
def predict():
    if not request.is_json:
        return jsonify({'error': 'JSON payload required'}), 400

    payload = request.get_json(silent=True)
    if payload is None or not isinstance(payload, dict):
        return jsonify({'error': 'Invalid JSON payload; expected a JSON object'}), 400

    feature_columns = current_app.config.get('FEATURE_COLUMNS')
    if not feature_columns:
        current_app.logger.error('Feature columns are not configured')
        return jsonify({'error': 'Server misconfiguration'}), 500

    missing_features = [col for col in feature_columns if col not in payload]
    if missing_features:
        return jsonify({
            'error': 'Missing required features',
            'missing_features': missing_features,
        }), 400

    try:
        df = pd.DataFrame([{col: payload[col] for col in feature_columns}])
        df = df.astype(float)
    except ValueError as exc:
        current_app.logger.exception('Invalid feature data type')
        return jsonify({'error': 'Invalid feature values', 'details': str(exc)}), 400
    except Exception as exc:
        current_app.logger.exception('Failed to construct DataFrame')
        return jsonify({'error': 'Prediction data preparation failed', 'details': str(exc)}), 500

    model = current_app.config.get('MODEL')
    if model is None:
        current_app.logger.error('Model is not configured')
        return jsonify({'error': 'Server misconfiguration'}), 500

    try:
        prediction = model.predict(df)
        prediction_value = int(prediction[0])
        status = 'Safe' if prediction_value == 1 else 'Unsafe'

        return jsonify({
            'prediction': prediction_value,
            'status': status,
        })
    except Exception as exc:
        current_app.logger.exception('Prediction failed')
        return jsonify({'error': 'Prediction failed', 'details': str(exc)}), 500
