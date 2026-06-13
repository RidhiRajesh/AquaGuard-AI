
import logging
import joblib
from flask import Flask, jsonify
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)
    configure_logging(app)
    load_startup_components(app)

    from routes.predict import predict_blueprint
    from routes.advisor import advisor_blueprint
    app.register_blueprint(predict_blueprint)
    app.register_blueprint(advisor_blueprint)

    @app.route('/', methods=['GET'])
    def root():
        return jsonify({"message": "AquaGuard AI Backend Running"})

    return app


def configure_logging(app):
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s %(levelname)s %(name)s %(message)s',
    )
    app.logger.setLevel(logging.INFO)
    app.logger.info('AquaGuard AI backend initializing')


def load_startup_components(app):
    app.logger.info('Loading model and feature columns from disk')
    try:
        app.config['MODEL'] = joblib.load('models/water_model.pkl')
        app.config['FEATURE_COLUMNS'] = joblib.load('models/feature_columns.pkl')

        if not isinstance(app.config['FEATURE_COLUMNS'], (list, tuple)):
            raise ValueError('feature_columns.pkl must contain a list or tuple')

        app.logger.info(
            'Loaded model and %d feature columns',
            len(app.config['FEATURE_COLUMNS']),
        )
    except Exception:
        app.logger.exception('Failed to load model or feature columns')
        raise


app = create_app()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

    

