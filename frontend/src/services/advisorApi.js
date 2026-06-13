export async function getAdvisorResponse(question, district, waterData, prediction, status) {
  const url = 'http://127.0.0.1:5000/api/advisor';

  const payload = {
    question,
    district,
    waterData,
    prediction,
    status,
  };

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
      const message = responseBody?.error || 'Unable to fetch advisor response';
      throw new Error(message);
    }

    return responseBody;
  } catch (error) {
    throw new Error(error?.message || 'Advisor service unavailable');
  }
}
