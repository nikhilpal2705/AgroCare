# AgroCare Features & Development Roadmap

## Phase 1: Foundation (Weeks 1-6) — MVP with Core Improvements

### Existing Modules — Improvements Required

#### 1. Dashboard Enhancement
- [x] Fix inventory count mapping (currently shows pest count)
- [x] Add real-time alerts widget (low stock, pending irrigation, high pest risk)
- [x] Show today's tasks and upcoming deadlines
- [x] Add simple charts: irrigation trend, crop health score
- [x] Quick action buttons for urgent tasks
- [x] **Backend:** Create dashboard aggregation service with alerts
- [x] **Frontend:** Redesign with alert badges and KPI cards

#### 2. Crop Monitoring Enhancement
- [x] Add crop stage tracking (seedling, vegetative, flowering, fruiting, maturity)
- [ ] Expected yield field with harvest prediction
- [x] Field/plot association
- [ ] Fertilizer schedule linked to crop stage
- [ ] Disease history timeline
- [ ] Add geolocation/field boundary mapping
- [ ] **Backend:** Create crop stage service and yield calculation logic
- [ ] **Frontend:** Add stage selector dropdown and date-based schedule UI

#### 3. Pest Control Enhancement
- [x] Fix typo: "pestiside" → "pesticide"
- [ ] Add severity level (low/medium/high) with color coding
- [ ] Image upload for pest/disease photos
- [ ] Treatment plan and recommended pesticide with dosage
- [ ] Recheck date scheduling
- [ ] Pesticide safety warnings (toxicity, wait period)
- [ ] Pest identification guide/reference
- [ ] **Backend:** Create pest severity service and treatment recommendation engine
- [ ] **Frontend:** Add image upload component and severity dropdown

#### 4. Irrigation Enhancement
- [ ] Add water volume applied (liters/hour)
- [ ] Irrigation method (drip/flood/sprinkler)
- [ ] Pump runtime tracking
- [ ] Missed irrigation alerts
- [ ] Water cost calculation
- [ ] **Backend:** Add irrigation analytics (water usage, cost per crop)
- [x] **Frontend:** Add method selector and water volume input fields

#### 5. Inventory Enhancement
- [ ] Add input category (seeds/fertilizer/pesticide/tools)
- [ ] Supplier name and contact
- [ ] Cost per unit tracking
- [ ] Expiry date with countdown alerts
- [ ] Minimum stock threshold with reorder alerts
- [ ] Consumption forecast based on crop stage
- [ ] **Backend:** Create inventory alert service with threshold logic
- [x] **Frontend:** Add category dropdown, expiry date field, supplier info form

#### 6. Farm/User Profile Enhancement
- [x] Separate farm profile from user profile
- [x] Farm name, address, GPS coordinates
- [ ] Total farm area and primary crops
- [ ] Land parcel/plot definitions
- [x] Irrigation source (well, canal, pond, borehole)
- [ ] Notification preferences for in-app alerts
- [x] **Backend:** Create farm entity and extend user-farm relationship
- [x] **Frontend:** Add farm profile section with map integration

#### 7. API Standardization
- [x] Unify user extraction: all endpoints should get user from JWT token (not query params)
- [ ] Add consistent error response contracts
- [ ] Implement standard pagination for list endpoints
- [ ] Add audit logging (created_by, updated_by, timestamps)
- [ ] **Backend:** Refactor pest and other controllers for consistency

---

## Phase 2: Smart Features (Weeks 7-14) — Core Farm Management

### New Module 1: Weather & Alert Engine
- [ ] **API Integration:** Fetch hyperlocal weather (OpenWeatherMap / WeatherAPI)
- [ ] Prefer a free or free-tier weather API so Phase 2 stays low-cost
- [ ] Daily forecast for farm location
- [ ] Alert triggers: heavy rain, frost, heat wave, low humidity
- [ ] Spray window recommendation (based on wind, rain forecast)
- [ ] Irrigation recommendation (based on rainfall forecast)
- [ ] Store weather history for trend analysis
- [ ] **Backend:** Weather service, alert scheduler, webhook triggering
- [ ] **Frontend:** Weather card on dashboard, alert notifications, 5-day forecast view

### New Module 2: Farm Task & Labor Management
- [ ] **Task Types:** Spraying, irrigation, harvesting, weeding, fertilizing
- [ ] Create tasks linked to crops and schedules
- [ ] Set deadline and priority
- [ ] Task completion status
- [ ] **Backend:** Task service
- [ ] **Frontend:** Task board (list/calendar view)

### New Module 3: Farm Finance Ledger & Profit Calculation
- [ ] **Expense Categories:** Seeds, fertilizer, pesticide, labor, fuel, equipment
- [ ] Record daily expenses with date, amount, category, notes
- [ ] **Income:** Record sales (crop, quantity, price received)
- [ ] **Reports:**
  - [ ] Crop-wise cost of production (input + labor)
  - [ ] Crop-wise revenue and profit margin
  - [ ] Monthly/seasonal cash flow
  - [ ] Field/plot profitability comparison
- [ ] **Export:** Generate reports as PDF
- [ ] **Backend:** Expense, income, and profit calculation services
- [ ] **Frontend:** Expense form, income form, profit dashboard with charts

### New Module 4: Market Price & Selling Module
- [ ] **Mandi Rates API:** Integrate govt. agricultural market data (per region/crop)
- [ ] Show current best price in nearby markets
- [ ] Alert user to price spikes
- [ ] **Produce Listing:** Create sale inventory (quantity, expected harvest date)
- [ ] **Backend:** Market price service
- [ ] **Frontend:** Mandi rates dashboard

---

## Phase 3: AI & Advanced Analytics (Weeks 15-22)

### New AI Module 1: AI-Powered Crop Health & Disease Detection
- [ ] **Image Upload:** Camera/gallery integration in pest and crop modules
- [ ] **ML Model:** Train/integrate model for:
  - [ ] Leaf disease detection (powdery mildew, blight, rust, etc.)
  - [ ] Pest identification from images
- [ ] **Backend:** Image processing service, ML model inference API
- [ ] **Frontend:** Add image analysis button with loading state and results display
- [ ] Confidence scores and treatment recommendations
- [ ] Link to treatment database and pesticide library
- [ ] Disease history per crop

### New AI Module 2: Yield Prediction & Crop Analytics
- [ ] **Data Collection:** Gather historical yields, weather, soil data
- [ ] **ML Model:** Predict yield based on:
  - [ ] Crop type, variety, field size
  - [ ] Historical yields/rainfall/temperature
  - [ ] Current crop stage and health
  - [ ] Irrigation and fertilizer applied
- [ ] Expected vs actual comparison
- [ ] Profit margin calculation (inputs + labor - revenue)
- [ ] Best performing field/varietal recommendations
- [ ] **Backend:** Yield prediction service, analytics aggregation
- [ ] **Frontend:** Yield dashboard with ML predictions, confidence intervals

### New AI Module 3: Smart Irrigation Scheduler
- [ ] **Weather Integration:** Fetch rainfall forecast
- [ ] **Algorithm:** Calculate water need using:
  - [ ] Crop type and growth stage
  - [ ] Weather forecast (rainfall, temperature, humidity)
  - [ ] Soil type and available water capacity
  - [ ] Field size
- [ ] **Recommendation:** Suggest next irrigation date and duration
- [ ] Cost optimization (minimize water + labor cost)
- [ ] **Backend:** Irrigation recommendation engine with ML scheduling
- [ ] **Frontend:** Next irrigation suggestion with reasoning, schedule accept/reject

### New AI Module 4: Soil Health & Fertilizer Recommendation
- [ ] **Soil Test Upload:** Store soil lab reports (NPK, pH, micronutrients, OM)
- [ ] Recommend fertilizer blend from crop type, soil test, and crop stage
- [ ] **Fertilizer Library:** Database of local fertilizers with NPK ratios
- [ ] **Application Schedule:** Recommend timing based on crop stage
- [ ] Cost-benefit analysis (ROI for fertilizer)
- [ ] **Backend:** Soil service, nutrient recommendation engine
- [ ] **Frontend:** Soil report upload, recommendation card, application schedule

### New AI Module 5: Farm Assistant Chatbot and Analytics
- [ ] **Question Answering Chatbot:**
  - [ ] Trained on agricultural best practices
  - [ ] Answers: "When to plant rice?" "How to treat blight?" "What fertilizer for low pH?"
  - [ ] Multi-language support
- [ ] **Trend Analysis:**
  - [ ] Yield trends per field (improving/declining)
  - [ ] Soil health improvement (year-over-year)
  - [ ] Weather pattern shifts (dry/wet seasons)
  - [ ] Cost trends per crop
- [ ] **Anomaly Detection:**
  - [ ] Unusual irrigation patterns (too much/little)
  - [ ] Expense spikes
  - [ ] Yield drops (investigate cause)
- [ ] **Forecasting:**
  - [ ] Price forecast for selling
  - [ ] Pesticide need forecast
- [ ] **Technology:** Local small model or open-source LLM for Q&A
- [ ] **Backend:** `/api/ai/chat`, `/api/ai/predict`, analytics services
- [ ] **Frontend:** Chat assistant, insight cards, trend charts, anomaly alerts

### New Module 6: Crop Rotation & Soil Health Advisor
- [ ] **Historical Data:** Track crop sequence per field
- [ ] **ML Model:** Recommend next crop based on:
  - [ ] Previous crop and soil recovery period
  - [ ] Market demand and prices
  - [ ] Farm profitability trends
  - [ ] Soil health indicators
- [ ] Benefits display: nitrogen fixation, disease break, profit
- [ ] **Backend:** Rotation recommendation engine
- [ ] **Frontend:** Rotation suggestion card with reasoning

---

## Phase 4: Connectivity & Accessibility (Weeks 23-28)

### New Module 7: Offline-First + Sync Engine
- [ ] **Local Storage:** Store crops, irrigation, inventory, tasks locally
- [ ] **IndexedDB:** For larger datasets
- [ ] **Sync Service:** Auto-sync when network available
- [ ] **Conflict Resolution:** Handle offline edits + server updates
- [ ] **Backend:** Sync API with change tracking (updated_at timestamps)
- [ ] **Frontend:** Service worker, offline indicator, manual sync button

### New Module 8: Multi-Language Support
- [ ] **Languages:** Hindi, Marathi, Gujarati, Tamil, Kannada, Telugu (configurable)
- [ ] **Translation:** UI labels, help text, alerts
- [ ] **Backend:** i18n setup
- [ ] **Frontend:** Language selector

---

## Notes

- **MVP Focus:** Complete Phase 1 first, then add weather, tasks, finance, and market prices from Phase 2.
- **Prioritize Farmers First:** Every feature must have clear ROI (money/time saved)
- **Regional Customization:** Support local crops, markets, schemes per region
- **Data Portability:** Export farmer data (CSV/JSON) for backup or switching
- **Continuous Learning:** Build feedback loop to improve ML models monthly
- **AI Docs:** `docs/FEATURES_AI_IMPLEMENTATION.md` is the detailed free-implementation guide for Phase 3 AI work; `docs/FEATURES_TODO.md` stays the main roadmap.
