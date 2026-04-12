# AgroCare AI Features — Unified Free Implementation Guide

This is the single canonical AI document for the project.
It combines high-level feature planning and low-cost implementation details.
The previous separate guide file has been merged into this document.

## TL;DR
✅ **Completely Free:** Disease detection, yield prediction, fertilizer recommendation, irrigation scheduling, pest risk, market price forecast
❌ **Requires Free Tier Limit:** Weather API (limited calls), SMS notifications (limited messages)
🔧 **Self-Hosted:** All ML models, database, training pipeline

---

## Architecture: Free & Open-Source Stack

```
┌─────────────────────────────────────────────────────────┐
│                    AgroCare Backend                     │
│                  (Spring Boot - Java)                   │
└───────────────┬─────────────────────────────────────────┘
                │
                ├── REST API → Python ML Service (FastAPI)
                │              - Disease detection (TensorFlow)
                │              - Yield prediction (scikit-learn)
                │              - Fertilizer recommendation (lookup tables)
                │              - Irrigation algorithm (math-based)
                │              - Pest risk scoring (rule-based + ML)
                │              - Price forecasting (Prophet)
                │
                └── Free External APIs
                   - OpenWeatherMap (free tier: 1000 calls/day)
                   - AGMARKNET/Government open data (market prices)
                   - No cost APIs
```

---

## AI Feature 1: Disease Detection (COST: $0)

### Approach: Pre-Trained Open-Source Models

**Option A: PlantVillage Dataset + Google Colab (Recommended for hobby)**
```
1. Get dataset: https://github.com/spMohanty/PlantVillage-Dataset
   - 50,000+ images
   - 14 crops × 38 diseases
   - 100% free to download

2. Train model: Google Colab (free GPU)
   - 12 hours free GPU per day
   - TensorFlow/Keras (free)
   - Train ResNet-50 on PlantVillage
   - Expected accuracy: 85-92%

3. Export: TensorFlow Lite (.tflite)
   - ~100MB model file
   - Store in your repo
```

**Option B: Use Pre-Trained Models (Even Faster)**
```
Available pre-trained models on Hugging Face (100% free):
- "google/efficientnet-b3" (crop disease classifier)
- "microsoft/resnet-50" (general image classification)

Just download & fine-tune on your crop photos (100 photos per disease).
```

**How to Implement:**

```python
# server/ml_service/disease_detector.py

from fastapi import FastAPI, File, UploadFile
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = FastAPI()

# Load model (one-time, at startup)
model = tf.lite.Interpreter("models/disease_classifier.tflite")
model.allocate_tensors()

# Treatment database (hardcoded for now, no expensive API)
TREATMENTS = {
    "Powdery Mildew": {
        "pesticide": "Sulfur 80%",
        "dosage": "25g/10L water",
        "sprayDays": [5, 10, 15],
        "waitPeriod": 7
    },
    "Leaf Rust": {
        "pesticide": "Propiconazole 25% EC",
        "dosage": "2ml/liter",
        "sprayDays": [10, 20],
        "waitPeriod": 14
    }
    # ... hardcode all diseases (100+ would use local DB)
}

@app.post("/api/ai/analyze-image")
async def analyze_disease(file: UploadFile = File(...)):
    # Read image
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))
    
    # Preprocess
    image = image.resize((224, 224))
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    
    # Run inference (runs on CPU, free, <2 sec)
    input_details = model.get_input_details()
    output_details = model.get_output_details()
    model.set_tensor(input_details[0]['index'], image_array.astype(np.float32))
    model.invoke()
    
    # Get output
    output_data = model.get_tensor(output_details[0]['index'])
    predictions = output_data[0]
    
    # Get top prediction
    predicted_class = np.argmax(predictions)
    confidence = float(predictions[predicted_class])
    
    disease_name = CLASS_NAMES[predicted_class]
    treatment = TREATMENTS.get(disease_name, {})
    
    return {
        "disease": disease_name,
        "confidence": confidence,
        "treatment": treatment
    }
```

**Cost:** $0 (use free GPU on Colab to train, deploy locally)

---

## AI Feature 2: Yield Prediction (COST: $0)

### Approach: scikit-learn + Historical Farm Data

**No fancy model needed.** Simple **Random Forest or XGBoost** trained on YOUR farm's data works great:

```python
# server/ml_service/yield_predictor.py

from sklearn.ensemble import RandomForestRegressor
import pandas as pd
import joblib

# Load historical data from your database
# Example: 50 crop records from past years
def train_yield_model():
    df = pd.read_csv("historical_yields.csv")  # from your DB
    
    X = df[['field_size', 'fertilizer_kg', 'irrigation_count', 
             'rainfall_mm', 'temp_avg', 'humidity']]
    y = df['actual_yield_kg']
    
    # Train model
    model = RandomForestRegressor(n_estimators=50, random_state=42)
    model.fit(X, y)
    
    # Save model
    joblib.dump(model, "yield_model.pkl")

@app.post("/api/ai/predict/yield")
async def predict_yield(request: YieldRequest):
    # Load model
    model = joblib.load("yield_model.pkl")
    
    # Prepare features
    features = [[
        request.fieldSizeHectares,
        request.fertilizerAppliedKg,
        request.irrigationCount,
        request.rainfallMm,
        request.tempAvg,
        request.humidity
    ]]
    
    # Predict
    predicted_yield = model.predict(features)[0]
    confidence = 0.85  # Default for now
    
    return {
        "predicted_yield": predicted_yield,
        "confidence": confidence,
        "comparison": f"+{((predicted_yield - avg_historical) / avg_historical * 100):.1f}%"
    }
```

**Training Strategy:**
- Start with 20 records → accuracy ~60%
- Collect more yields → 50 records → accuracy ~75%
- 100+ records → accuracy ~85-90%
- **Re-train monthly** as you get new harvest data

**Cost:** $0 (scikit-learn is free, runs on CPU)

---

## AI Feature 3: Fertilizer Recommendation (COST: $0)

### Approach: Lookup Table + Simple Math

**No ML needed!** This is deterministic:

```python
# server/ml_service/fertilizer_advisor.py

# Hardcoded fertilizer library (or read from DB)
FERTILIZERS = {
    "Urea": {"npk": [46, 0, 0], "costPerKg": 35},
    "DAP": {"npk": [18, 46, 0], "costPerKg": 50},
    "MOP": {"npk": [0, 0, 60], "costPerKg": 30},
    "Potassium Nitrate": {"npk": [13, 0, 46], "costPerKg": 80},
}

# Crop nutrient requirements (hardcode per crop)
CROP_REQUIREMENTS = {
    "Rice": {"N": 120, "P": 40, "K": 40},
    "Wheat": {"N": 100, "P": 30, "K": 30},
    "Maize": {"N": 150, "P": 35, "K": 40},
}

@app.post("/api/ai/recommend/fertilizer")
async def recommend_fertilizer(request: FertilizerRequest):
    crop_req = CROP_REQUIREMENTS[request.cropType]
    soil = request.soilTest
    
    # Calculate deficiency
    N_deficit = crop_req["N"] - soil.nitrogenMgPerKg
    P_deficit = crop_req["P"] - soil.phosphorusMgPerKg
    K_deficit = crop_req["K"] - soil.potassiumMgPerKg
    
    # Find cheapest fertilizer combo
    recommendations = []
    
    # Recommendation for N
    if N_deficit > 0:
        urea_qty = N_deficit / FERTILIZERS["Urea"]["npk"][0]
        recommendations.append({
            "nutrient": "N",
            "fertilizer": "Urea",
            "quantity_kg": urea_qty,
            "cost": urea_qty * 35
        })
    
    # Similar for P, K
    # ...
    
    return {
        "recommendations": recommendations,
        "totalCost": sum([r["cost"] for r in recommendations]),
        "expectedYieldIncrease": "10-15%"
    }
```

**Cost:** $0 (pure lookup + math)

---

## AI Feature 4: Smart Irrigation Scheduler (COST: $0)

### Approach: ET (Evapotranspiration) Algorithm + Free Weather API

**Evapotranspiration is physics, not ML:**

```python
# server/ml_service/irrigation_advisor.py

import requests
from datetime import datetime

# Free weather API: Open-Meteo (no API key needed!)
def get_weather(lat, lon):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,relative_humidity_2m_max"
    response = requests.get(url)
    return response.json()

# Hardcoded Kc values (crop coefficient by stage)
KC_VALUES = {
    "Rice": {"seedling": 0.9, "vegetative": 1.15, "flowering": 1.20, "ripening": 0.4},
    "Wheat": {"seedling": 0.7, "vegetative": 0.8, "flowering": 1.0, "ripening": 0.5},
}

@app.post("/api/ai/recommend/irrigation")
async def recommend_irrigation(request: IrrigationRequest):
    # Get weather (Open-Meteo free, unlimited calls)
    weather = get_weather(request.farmLat, request.farmLon)
    
    # Calculate Reference ET (FAO Penman-Monteith simplified)
    ref_et = calculate_ref_et(weather)  # mm/day
    
    # Get crop Kc for current stage
    kc = KC_VALUES[request.cropType][request.cropStage]
    
    # Actual ET
    actual_et = ref_et * kc
    
    # Water deficit (ET - rainfall)
    cumulative_deficit = actual_et - weather["daily"]["precipitation_sum"][0]
    
    # Check if irrigation needed
    available_water = 150  # mm (soil dependent)
    depletion_fraction = 0.50
    
    if cumulative_deficit > (available_water * depletion_fraction):
        return {
            "irrigate": True,
            "date": "Tomorrow",
            "duration_hours": 3,
            "water_mm": int(cumulative_deficit),
            "reason": f"ET accumulated {int(cumulative_deficit)}mm, rainfall forecast only 5mm"
        }
    else:
        return {
            "irrigate": False,
            "nextCheck": "In 3 days",
            "reason": "Soil moisture adequate"
        }
```

**Cost:** $0
- Open-Meteo: Free weather data (no API key, unlimited calls)
- Algorithm: Pure physics (FAO-PM simplified)
- Runs on CPU in <100ms

---

## AI Feature 5: Pest Risk Prediction (COST: $0)

### Approach: Rule-Based Scoring (No ML Needed for MVP)

```python
# server/ml_service/pest_advisor.py

PEST_THRESHOLD = {
    "Brown Planthopper": {
        "humidity_min": 70,
        "temp_min": 25,
        "temp_max": 32,
        "favorable_stages": ["vegetative", "flowering"]
    },
    "Leaf Folder": {
        "humidity_min": 60,
        "temp_min": 24,
        "temp_max": 30,
        "favorable_stages": ["flowering", "ripening"]
    }
}

@app.post("/api/ai/predict/pest-risk")
async def predict_pest_risk(request: PestRequest):
    weather = get_weather(request.farmLat, request.farmLon)
    
    risks = []
    for pest, conditions in PEST_THRESHOLD.items():
        temp = weather["daily"]["temperature_2m_max"][0]
        humidity = weather["daily"]["relative_humidity_2m_max"][0]
        
        risk_score = 0
        
        # Temperature favorable?
        if conditions["temp_min"] <= temp <= conditions["temp_max"]:
            risk_score += 40
        
        # Humidity favorable?
        if humidity >= conditions["humidity_min"]:
            risk_score += 35
        
        # Stage favorable?
        if request.cropStage in conditions["favorable_stages"]:
            risk_score += 25
        
        if risk_score > 50:
            risks.append({
                "pest": pest,
                "risk_score": risk_score,
                "reason": "Favorable weather & crop stage",
                "action": "Spray preventively within 2 days"
            })
    
    return {"pests": risks}
```

**Cost:** $0 (pure rule-based logic + free weather API)

---

## AI Feature 6: Market Price Forecasting (COST: $0)

### Approach: Government Open Data + Simple Trend Analysis

```python
# server/ml_service/market_advisor.py

# Government market data (free, available in India via AGMARKNET)
# Download historical prices: https://agmarknet.gov.in/

import pandas as pd
from sklearn.linear_model import LinearRegression

def load_market_data():
    # Use AGMARKNET historical data (CSV, free)
    df = pd.read_csv("rice_prices_historical.csv")  # manual download
    return df

@app.post("/api/ai/recommend/selling")
async def recommend_selling_strategy(request: SellingRequest):
    # Load historical prices
    price_data = load_market_data()
    
    # Simple trend: last 30 days vs. average
    recent = price_data.tail(30)["price"].mean()
    historical_avg = price_data["price"].mean()
    
    # Seasonal pattern: "Dec is peak for rice"
    month = datetime.now().month
    seasonal_factor = 1.15 if month == 12 else 1.0
    
    # Forecast
    forecasted_price = (recent * 0.7 + historical_avg * 0.3) * seasonal_factor
    
    # When to sell?
    days_until_peak = 45 if month < 12 else 0
    
    return {
        "current_price": float(recent),
        "forecasted_price": float(forecasted_price),
        "best_selling_window": f"+{days_until_peak} days",
        "expected_revenue": forecasted_price * request.quantityTons,
        "confidence": 0.65
    }
```

**Cost:** $0
- Use government AGMARKNET data (free CSV download monthly)
- No fancy ML; trend + seasonal adjustments work well
- Or build your own price DB by saving farmer sales

---

## Complete Free Tech Stack

```
Frontend (React)
├── Already using Antd (free)
└── Add: Image upload component (free)

Backend (Spring Boot - Java)
├── Create Python FastAPI microservice for ML

Python ML Microservice (NEW)
├── FastAPI (free web framework)
├── TensorFlow Lite (free, pre-trained models)
├── scikit-learn (free ML library)
├── pandas (free data processing)
├── Prophet (free forecasting)
└── requests (free HTTP library)

External APIs (ALL FREE)
├── Open-Meteo (weather, unlimited, no key)
├── AGMARKNET/eNAM (market prices, free CSV)
└── Your database (MySQL already running)

Hosting (ALL FREE)
├── Backend: GitHub Actions + local server (or free tier: Heroku, Railway)
├── ML Service: Python script on same server (CPU inference)
├── Docker: Free
└── Database: MySQL (already have)

Models Storage
├── TensorFlow Lite (.tflite): 100MB max, store in repo
├── scikit-learn (.pkl): <10MB, store in repo
└── Treatment database: JSON config file
```

---

## Phased Implementation Plan (Free)

### Week 1-2: Disease Detection MVP
```
Monday: Download PlantVillage dataset (~5GB)
Wednesday: Train model on Google Colab (free GPU)
Friday: Export to TF Lite, integrate FastAPI endpoint
Total: 0 hours paid work, 20-30 hours hobby time
Result: /api/ai/analyze-image working
```

### Week 3-4: Yield Prediction
```
Monday: Export 50 historical crop records to CSV
Wednesday: Train Random Forest on Colab
Friday: Deploy endpoint
Result: /api/ai/predict/yield working
```

### Week 5-6: Irrigation + Fertilizer
```
Both are deterministic (no ML training needed)
Monday: Code irrigation ET algorithm
Wednesday: Code fertilizer lookup
Friday: Deploy endpoints
Result: /api/ai/recommend/irrigation, /api/ai/recommend/fertilizer working
```

### Week 7: Pest Risk + Market Prices
```
Monday: Code pest rule-based scoring
Tuesday: Download market historical CSV
Wednesday: Code trend forecasting
Friday: Deploy endpoints
Result: /api/ai/predict/pest-risk, /api/ai/recommend/selling working
```

---

## Running ML Service Locally

```bash
# Install Python dependencies
cd server/ml_service
pip install fastapi tensorflow scikit-learn pandas prophet uvicorn

# Download models (one-time)
# - Download disease_classifier.tflite from Hugging Face

# Start ML service
uvicorn main:app --port 8001 --reload

# Spring Boot calls it
# POST http://localhost:8001/api/ai/analyze-image
```

---

## File Structure

```
AgroCare/
├── server/
│   ├── src/main/java/
│   │   └── com/agrocare/controller/AIController.java (calls ML service)
│   │
│   └── ml_service/ (NEW - Python)
│       ├── main.py (FastAPI app)
│       ├── disease_detector.py
│       ├── yield_predictor.py
│       ├── fertilizer_advisor.py
│       ├── irrigation_advisor.py
│       ├── pest_advisor.py
│       ├── market_advisor.py
│       ├── requirements.txt
│       └── models/
│           ├── disease_classifier.tflite
│           └── yield_model.pkl
│
└── client/
    └── src/components/
        └── ImageUpload.jsx (new component)
```

---

## Costs Breakdown

| Feature | Cost | Why Free |
|---------|------|----------|
| Disease Detection | $0 | TensorFlow + PlantVillage dataset |
| Yield Prediction | $0 | scikit-learn |
| Fertilizer Rec | $0 | Lookup table |
| Irrigation | $0 | ET algorithm + Open-Meteo API |
| Pest Risk | $0 | Rule-based scoring |
| Market Forecast | $0 | AGMARKNET data + trend |
| **Total** | **$0** | All open-source |

---

## What Costs Money (For Reference)

| Service | Cost | Why You Don't Need It |
|---------|------|----------------------|
| AWS SageMaker | $1000+ | Your models fit in .tflite |
| Google Cloud AI | $300+ | Free Colab + local inference |
| Microsoft Azure | $200+ | scikit-learn is sufficient |
| Paid ML APIs | $100-500/month | You can train your own |
| Weather API (paid) | $10-50/month | Open-Meteo is unlimited free |
| Market Data API | $50-200+ | Government data is free CSV |

---

## Common Questions

### Q: Will performance be good enough?
**A:** Yes! For hobby project:
- Disease detection: 85-90% accuracy (enough to help farmer)
- Yield prediction: ±15% error (useful for planning)
- Irrigation: Saves 20-30% water (using physics, not ML)
- Farmers will love 60% accuracy if it saves them money

### Q: Does ML service need separate server?
**A:** No! Run on same server as Spring Boot
- Python FastAPI: Lightweight, <50MB memory
- CPU-based inference: <2 seconds per prediction
- If CPU is maxed, scale later (for free on Linux)

### Q: What if I need GPU later?
**A:** Free options:
- Google Colab: 12 hours free GPU/day (for training)
- Kaggle: Free GPU (for experiments)
- Only deploy to GPU server if you have 1000+ users

### Q: How to handle model updates?
**A:** Manual for now:
1. Collect farmer feedback ("Did recommendation work?")
2. Monthly: Retrain on new data (Colab)
3. Update .tflite file in repo
4. Redeploy

### Q: What about data privacy?
**A:** Stored locally:
- Images: Farmer uploads → you save locally → delete after analysis (or keep)
- Predictions: Return JSON, don't store farmer data externally
- No sending to Google/AWS (unless you want to optimize storage)

---

## Next Steps

1. ✅ Start with **Disease Detection** (most impressive to farmers)
   - Set up Python FastAPI service
   - Download + train on Colab
   - Integrate with existing Pest module

2. ✅ Add **Yield Prediction** (second most useful)
   - Start with 20 records from your test farmers
   - Train, deploy, watch accuracy improve monthly

3. ✅ Add **Irrigation** (save water, visible ROI)
   - Free weather API
   - Deploy deterministic ET algorithm

4. ✅ Others follow naturally

---

## Resources (All Free)

- **ML**: https://www.tensorflow.org/lite, https://scikit-learn.org/
- **Datasets**: https://github.com/spMohanty/PlantVillage-Dataset
- **Training**: https://colab.research.google.com (free GPU)
- **APIs**: https://open-meteo.com/, https://agmarknet.gov.in/
- **Frameworks**: FastAPI, Flask (free)
- **Hosting**: GitHub Actions runners (180 min/day free), Railway, Render free tier

