export async function getWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&hourly=temperature_2m,relativehumidity_2m,rain&timezone=auto`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const hourly = data.hourly;

    if (
      !hourly ||
      !Array.isArray(hourly.time) ||
      !Array.isArray(hourly.temperature_2m) ||
      !Array.isArray(hourly.relativehumidity_2m) ||
      !Array.isArray(hourly.rain)
    ) {
      throw new Error('Incomplete weather data from API');
    }

    const lastIndex = hourly.time.length - 1;
    if (lastIndex < 0) {
      throw new Error('No hourly weather data available');
    }

    return {
      temperature: hourly.temperature_2m[lastIndex],
      humidity: hourly.relativehumidity_2m[lastIndex],
      rainfall: hourly.rain[lastIndex],
    };
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    throw error;
  }
}
