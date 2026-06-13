export async function getWaterPrediction(payload) {
  const url = 'http://127.0.0.1:5000/api/predict';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseBody = await response.json().catch(() => null);

    if (!response.ok) {
      const message = responseBody?.error || 'Unable to fetch prediction';
      throw new Error(message);
    }

    return responseBody;
  } catch (error) {
    throw new Error(error?.message || 'Prediction service unavailable');
  }
}
