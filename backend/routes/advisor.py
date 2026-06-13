from services.gemini_service import ask_gemini
from flask import Blueprint, jsonify, request, current_app

advisor_blueprint = Blueprint('advisor', __name__)


def generate_advisor_response(question, district, water_data, prediction, status):
    """
    Generate context-aware water quality advisor response.
    """
    ph = water_data.get('ph', 'N/A')
    solids = water_data.get('Solids', 'N/A')
    chloramines = water_data.get('Chloramines', 'N/A')
    sulfate = water_data.get('Sulfate', 'N/A')
    conductivity = water_data.get('Conductivity', 'N/A')
    organic_carbon = water_data.get('Organic_carbon', 'N/A')
    trihalomethanes = water_data.get('Trihalomethanes', 'N/A')
    turbidity = water_data.get('Turbidity', 'N/A')

    question_lower = question.lower()

    if status == 'Unsafe':
        if any(word in question_lower for word in ['drink', 'safe', 'safe to drink', 'drinkable']):
            return f'Water in {district} is currently UNSAFE for drinking. Do NOT consume directly. Recommendations: (1) Use bottled water for drinking and cooking. (2) Boil water for at least 1 minute before use if bottled is unavailable. (3) Avoid contact with contaminated water. (4) Wait for official all-clear before resuming normal use.'

        if 'tds' in question_lower or 'solids' in question_lower:
            return f'Total Dissolved Solids (TDS) in {district} is {solids} mg/L, which is elevated. High TDS can indicate: (1) Mineral content increase. (2) Potential contamination. (3) Water hardness. Current status: UNSAFE. Recommendations: Use RO or distillation systems, or switch to bottled water.'

        if 'ph' in question_lower:
            return f'pH in {district} is {ph}. The ideal drinking water pH is 6.5-8.5. Current level: {ph}. Status: UNSAFE for direct consumption. The water may have chemical imbalances. Boil and treat before use, or use bottled water.'

        if 'contamination' in question_lower or 'alert' in question_lower:
            return f'Water in {district} has contamination concerns (Status: UNSAFE). Actions: (1) Do not use for drinking. (2) Minimize contact. (3) Use bottled water. (4) Check local health department updates. (5) Report any health issues to authorities.'

        return f'Water in {district} is currently UNSAFE based on AI prediction. Key parameters: pH={ph}, Solids={solids} mg/L, Conductivity={conductivity}. Recommendations: Use bottled water or treated water. Avoid direct consumption. Contact local water authority for updates.'

    else:  # Status == 'Safe'
        if any(word in question_lower for word in ['drink', 'safe', 'safe to drink', 'drinkable']):
            return f'Water in {district} is SAFE for drinking according to the latest analysis. Parameters: pH={ph} (normal), Solids={solids} mg/L (acceptable), Turbidity={turbidity} (clear). You can safely consume the water. Continue monitoring for any changes.'

        if 'tds' in question_lower or 'solids' in question_lower:
            return f'Total Dissolved Solids (TDS) in {district} is {solids} mg/L, which is within acceptable limits for drinking water. This indicates good water quality with balanced mineral content. Safe for daily consumption.'

        if 'ph' in question_lower:
            return f'pH in {district} is {ph}, which is within the safe drinking water range (6.5-8.5). This indicates balanced acidity and alkalinity. The water is suitable for consumption and household use.'

        if 'contamination' in question_lower or 'alert' in question_lower:
            return f'Water in {district} is currently SAFE with no active contamination alerts. Parameters show good quality: pH={ph}, Solids={solids} mg/L. Continue normal water usage. Stay informed about any future alerts.'

        return f'Water in {district} is SAFE for use. Analysis shows: pH={ph} (normal), Solids={solids} mg/L (acceptable), Turbidity={turbidity} (clear), Conductivity={conductivity} (normal). Recommended for drinking and household use. Stay informed about any changes.'


@advisor_blueprint.route('/api/advisor', methods=['POST'])
def advisor():
    if not request.is_json:
        return jsonify({'error': 'JSON payload required'}), 400

    payload = request.get_json(silent=True)
    if payload is None or not isinstance(payload, dict):
        return jsonify({'error': 'Invalid JSON payload; expected a JSON object'}), 400

    required_fields = ['question', 'district', 'waterData', 'prediction', 'status']
    missing = [field for field in required_fields if field not in payload]
    if missing:
        return jsonify({
            'error': 'Missing required fields',
            'missing_fields': missing,
        }), 400

    try:
        question = payload.get('question', '').strip()
        district = payload.get('district', '').strip()
        water_data = payload.get('waterData', {})
        prediction = payload.get('prediction')
        status = payload.get('status', '')

        if not question:
            return jsonify({'error': 'Question cannot be empty'}), 400

        if not district:
            return jsonify({'error': 'District cannot be empty'}), 400

        if status not in ['Safe', 'Unsafe']:
            return jsonify({'error': 'Status must be Safe or Unsafe'}), 400

        response_text = ask_gemini(question,district,water_data,status)

        return jsonify({
            'answer': response_text,
            'district': district,
            'status': status,
        })

    except Exception as exc:
        current_app.logger.exception('Advisor request failed')
        return jsonify({'error': 'Advisor request failed', 'details': str(exc)}), 500
