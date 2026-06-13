import requests
from pprint import pprint


def main():
    url = 'http://127.0.0.1:5000/api/predict'
    payload = {
        'ph': 7.2,
        'Hardness': 180,
        'Solids': 15000,
        'Chloramines': 7,
        'Sulfate': 300,
        'Conductivity': 450,
        'Organic_carbon': 14,
        'Trihalomethanes': 65,
        'Turbidity': 4,
    }

    try:
        response = requests.post(url, json=payload, timeout=10)
        print('Status Code:', response.status_code)
        content_type = response.headers.get('Content-Type', '')

        if 'application/json' in content_type:
            pprint(response.json())
        else:
            print(response.text)
    except requests.RequestException as exc:
        print('Request failed:', exc)


if __name__ == '__main__':
    main()