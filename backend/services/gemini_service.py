import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")


def ask_gemini(question, district, water_data, status):
    prompt = f"""
You are AquaGuard AI.

District: {district}

Water Status: {status}

Water Parameters:
{water_data}

User Question:
{question}

Give a practical and easy-to-understand answer.

Keep response under 200 words.
"""

    response = model.generate_content(prompt)

    return response.text