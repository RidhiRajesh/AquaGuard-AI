import joblib
import pandas as pd

model = joblib.load("models/water_model.pkl")

data = pd.DataFrame([{
    "ph": 7.2,
    "Hardness": 180,
    "Solids": 15000,
    "Chloramines": 7,
    "Sulfate": 300,
    "Conductivity": 450,
    "Organic_carbon": 14,
    "Trihalomethanes": 65,
    "Turbidity": 4
}])

prediction = model.predict(data)

print(prediction)