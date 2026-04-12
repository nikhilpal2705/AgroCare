# AgroCare Features & Development Roadmap

## Phase 1: Foundation (Weeks 1-6) — MVP with Core Improvements

### Existing Modules — Improvements Required

#### 1. Dashboard Enhancement
- [ ] Fix inventory count mapping (currently shows pest count)
- [ ] Add real-time alerts widget (low stock, pending irrigation, high pest risk)
- [ ] Show today's tasks and upcoming deadlines
- [ ] Add simple charts: irrigation trend, crop health score
- [ ] Quick action buttons for urgent tasks
- [ ] **Backend:** Create dashboard aggregation service with alerts
- [ ] **Frontend:** Redesign with alert badges and KPI cards

#### 2. Crop Monitoring Enhancement
- [ ] Add crop stage tracking (seedling, vegetative, flowering, fruiting, maturity)
- [ ] Expected yield field with harvest prediction
- [ ] Field/plot association
- [ ] Fertilizer schedule linked to crop stage
- [ ] Disease history timeline
- [ ] Add geolocation/field boundary mapping
- [ ] **Backend:** Create crop stage service and yield calculation logic
- [ ] **Frontend:** Add stage selector dropdown and date-based schedule UI

#### 3. Pest Control Enhancement
- [ ] Fix typo: "pestiside" → "pesticide"
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
- [ ] **Frontend:** Add method selector and water volume input fields

#### 5. Inventory Enhancement
- [ ] Add input category (seeds/fertilizer/pesticide/tools)
- [ ] Supplier name and contact
- [ ] Cost per unit tracking
- [ ] Expiry date with countdown alerts
- [ ] Minimum stock threshold with reorder alerts
- [ ] Consumption forecast based on crop stage
- [ ] **Backend:** Create inventory alert service with threshold logic
- [ ] **Frontend:** Add category dropdown, expiry date field, supplier info form

#### 6. Farm/User Profile Enhancement
- [ ] Separate farm profile from user profile
- [ ] Farm name, address, GPS coordinates
- [ ] Total farm area and primary crops
- [ ] Land parcel/plot definitions
- [ ] Irrigation source (well, canal, pond, borehole)
- [ ] Preferred language setting
- [ ] Notification preferences (SMS/email/WhatsApp)
- [ ] **Backend:** Create farm entity and extend user-farm relationship
- [ ] **Frontend:** Add farm profile section with map integration

#### 7. API Standardization
- [ ] Unify user extraction: all endpoints should get user from JWT token (not query params)
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
- [ ] Assign to workers with deadline
- [ ] Worker registration with skills, availability, wage rates
- [ ] Attendance tracking (QR code or manual)
- [ ] Task completion status and photos
- [ ] Wage calculation (hourly/daily/piecemeal)
- [ ] **Backend:** Task, worker, and attendance service
- [ ] **Frontend:** Task board (list/calendar view), worker directory, attendance UI

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
- [ ] Buyer matching (if B2B market available)
- [ ] Order tracking and payment status
- [ ] **Backend:** Market price service, seller listing service
- [ ] **Frontend:** Mandi rates dashboard, create listing form, sale history

---

## Phase 3: AI & Advanced Analytics (Weeks 15-22)

### New AI Module 1: AI-Powered Crop Health & Disease Detection
- [ ] **Image Upload:** Camera/gallery integration in pest and crop modules
- [ ] **ML Model:** Train/integrate model for:
  - [ ] Leaf disease detection (powdery mildew, blight, rust, etc.)
  - [ ] Pest identification from images
  - [ ] Crop stage estimation
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
- [ ] **Soil Data:** Integrate soil moisture sensors (optional IoT)
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
- [ ] **Nutrient Deficiency Detection:** ML model to:
  - [ ] Predict deficiency from visual symptoms + soil test
  - [ ] Recommend fertilizer blend
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
- [ ] **Feedback Analysis:**
  - [ ] Parse farmer notes and extract issues
  - [ ] Link to actionable recommendations
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
  - [ ] Next season's expected rainfall
  - [ ] Price forecast for selling
  - [ ] Pesticide need forecast
- [ ] **Technology:** Local small model or open-source LLM for Q&A, time-series analysis service for trends
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

### New Module 7: Equipment & Maintenance Management
- [ ] Register farm assets: tractors, pumps, implements, tools
- [ ] Track usage: hours, maintenance history, repair costs
- [ ] **Maintenance Scheduler:** Recommend service based on:
  - [ ] Usage hours
  - [ ] Last service date
  - [ ] Seasonal requirements
- [ ] Fuel/oil consumption tracking
- [ ] Resale value estimation
- [ ] **Backend:** Equipment service with maintenance alerts
- [ ] **Frontend:** Equipment registry, service log, maintenance calendar

### New Module 8: Government Subsidy & Scheme Tracker
- [ ] **Scheme Database:** Central DB of agricultural schemes by region/state
- [ ] **Eligibility Checker:** Pre-filter schemes by farm type, crops, area
- [ ] **Document Checklist:** Required docs per scheme
- [ ] **Application Status Tracker:** Manual status updates or API integration
- [ ] Deadline reminders
- [ ] **Backend:** Scheme service with eligibility logic
- [ ] **Frontend:** Scheme explorer, application tracker, document checklist

### New Module 9: Document Vault & Digital Records
- [ ] Upload and organize:
  - [ ] Land ownership/lease documents
  - [ ] Soil test reports
  - [ ] Insurance policies
  - [ ] Purchase bills and invoices
  - [ ] Scheme application proofs
- [ ] Full-text search across documents
- [ ] Document expiry alerts (insurance, certifications)
- [ ] **Backend:** File storage service (AWS S3 or local), document indexing
- [ ] **Frontend:** Document upload, browser, search interface

---

## Phase 4: Connectivity & Accessibility (Weeks 23-28)

### New Module 13: Offline-First + Sync Engine
- [ ] **Local Storage:** Store crops, irrigation, inventory, tasks locally
- [ ] **IndexedDB:** For larger datasets
- [ ] **Sync Service:** Auto-sync when network available
- [ ] **Conflict Resolution:** Handle offline edits + server updates
- [ ] **Backend:** Sync API with change tracking (updated_at timestamps)
- [ ] **Frontend:** Service worker, offline indicator, manual sync button

### New Module 14: Multi-Language & Voice Input
- [ ] **Languages:** Hindi, Marathi, Gujarati, Tamil, Kannada, Telugu (configurable)
- [ ] **Translation:** UI labels, help text, alerts
- [ ] **Voice Input:** Speech-to-text for:
  - [ ] Quick expense/task logging
  - [ ] Voice notes per crop/field
- [ ] **Text-to-Speech:** Read alerts and recommendations aloud
- [ ] **Backend:** i18n setup, voice API integration (Google Speech-to-Text)
- [ ] **Frontend:** Language selector, voice button, TTS on alerts

### New Module 15: WhatsApp/SMS Integration
- [ ] **Notification Hub:** Send critical alerts via:
  - [ ] SMS (for low-end phones)
  - [ ] WhatsApp (for smartphones)
  - [ ] In-app notifications
- [ ] **Message Templates:** Customizable alerts per event
- [ ] **Opt-in:** User preference management
- [ ] **Backend:** Notification service (Twilio or local SMS gateway)
- [ ] **Frontend:** Notification preference settings

---

## AI & ML Features — Reference Catalog

### AI Module 1: Image Recognition & Disease Detection
- [ ] **Technology:** TensorFlow Lite or ONNX for mobile/edge inference
- [ ] **Training Data:** Publicly available crop disease datasets
- [ ] **Models to Build/Integrate:**
  - [ ] Leaf disease classifier (tomato, wheat, rice, etc.)
  - [ ] Pest identification (insects, aphids, beetles, etc.)
  - [ ] Crop stage estimator
  - [ ] Weed vs crop identification
- [ ] **Features:**
  - [ ] Real-time camera feed analysis
  - [ ] Photo gallery upload
  - [ ] Confidence score threshold
  - [ ] Treatment recommendation lookup
- [ ] **Deployment:** Run on-device (TensorFlow Lite) for offline capability
- [ ] **Backend API:** `/api/ai/analyze-image` (crop disease, pest, stage)

### AI Module 2: Predictive Analytics Engine
- [ ] **Yield Prediction Model:**
  - [ ] Inputs: crop type, field size, weather history, fertility, irrigation, variety
  - [ ] Output: Expected yield (kg/ha) with confidence
  - [ ] Retraining: Monthly with actual harvest data
- [ ] **Pest Risk Scoring:**
  - [ ] Inputs: crop stage, weather (humidity, temp), pest history
  - [ ] Output: Risk level (low/medium/high) + recommended action
- [ ] **Disease Risk Prediction:**
  - [ ] Inputs: weather (rain, humidity), crop stage, soil health
  - [ ] Output: Disease risk + preventive treatment window
- [ ] **Market Price Prediction:**
  - [ ] Inputs: historical prices, seasonal trends, supply
  - [ ] Output: Best selling window forecast
- [ ] **Algorithms:** Random Forest or Gradient Boosting (scikit-learn or XGBoost)
- [ ] **Backend API:** `/api/ai/predict` (with prediction type parameter)

### AI Module 3: Recommender System
- [ ] **Fertilizer Recommendation:**
  - [ ] Inputs: soil test (NPK, pH), crop type, soil type, irrigation
  - [ ] Output: Recommended fertilizer + application schedule + cost
- [ ] **Pesticide Recommendation:**
  - [ ] Inputs: pest/disease detected, crop type, region
  - [ ] Output: Recommended product + dosage + safety info
- [ ] **Crop Recommendation:**
  - [ ] Inputs: soil type, water availability, market price, farm history
  - [ ] Output: 3 best crops by profit + why
- [ ] **Irrigation Schedule Recommendation:**
  - [ ] Inputs: crop stage, soil moisture, weather forecast, field size
  - [ ] Output: Next irrigation date/time + duration + water amount
- [ ] **Algorithms:** Content-based filtering or hybrid recommendation
- [ ] **Backend API:** `/api/ai/recommend` (with context parameters)

### AI Module 4: Natural Language Processing (NLP)
- [ ] **Question Answering Chatbot:**
  - [ ] Trained on agricultural best practices
  - [ ] Answers: "When to plant rice?" "How to treat blight?" "What fertilizer for low pH?"
  - [ ] Multi-language support
- [ ] **Feedback Analysis:**
  - [ ] Parse farmer notes and extract issues
  - [ ] Link to actionable recommendations
- [ ] **Technology:** LLM API (OpenAI/Hugging Face) or local small model
- [ ] **Backend API:** `/api/ai/chat` for Q&A

### AI Module 5: Time Series Analytics
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
  - [ ] Next season's expected rainfall
  - [ ] Price forecast for selling
  - [ ] Pesticide need forecast
- [ ] **Backend:** Time series database (InfluxDB) + analysis service
- [ ] **Frontend:** Trend charts, anomaly alerts, seasonal forecasts

---

## Infrastructure & DevOps Enhancements

### Backend Infrastructure
- [ ] [ ] **Database:** Partition large tables (Crop, Pest, Irrigation by user_id or date)
- [ ] [ ] **Search:** Add Elasticsearch for document vault and alert search
- [ ] [ ] **Cache:** Redis for session, weather cache, recommendation cache
- [ ] [ ] **Job Queue:** Background jobs for weather fetch, ML inference, report generation
- [ ] [ ] **File Storage:** S3 or MinIO for images, soil reports, documents
- [ ] [ ] **Logging & Monitoring:** ELK stack or DataDog for performance tracking

### Deployment
- [ ] [ ] **Docker:** Containerize backend and frontend separately
- [ ] [ ] **Kubernetes:** Multi-environment setup (dev, staging, prod)
- [ ] [ ] **CI/CD:** GitHub Actions or Jenkins for automated testing and deployment
- [ ] [ ] **Mobile:** React Native or Flutter wrapper for iOS/Android
- [ ] [ ] **Progressive Web App (PWA):** Offline support via service workers

---

## Security & Compliance

- [ ] [ ] End-to-end encryption for sensitive documents
- [ ] [ ] Role-based access control (RBAC): farmer, extension officer, admin
- [ ] [ ] Data privacy: GDPR compliance for EU users
- [ ] [ ] Two-factor authentication (2FA) via SMS/email
- [ ] [ ] Audit trail: track all data changes
- [ ] [ ] Regular security audits and penetration testing

---

## Testing & Quality Assurance

- [ ] [ ] Unit tests for all business logic (>80% coverage)
- [ ] [ ] Integration tests for API endpoints
- [ ] [ ] E2E tests for critical user flows (registration → crop → irrigation)
- [ ] [ ] Performance testing under load
- [ ] [ ] Accessibility testing (WCAG 2.1 AA)
- [ ] [ ] User acceptance testing (UAT) with pilot farmers

---

## Documentation & Community

- [ ] [ ] User guide (PDF + video tutorials)
- [ ] [ ] Admin guide for extension officers
- [ ] [ ] API documentation (Swagger/OpenAPI)
- [ ] [ ] Developer guide for contributors
- [ ] [ ] FAQ and troubleshooting
- [ ] [ ] Community forum or Telegram group for farmers

---

## Success Metrics

- [ ] [ ] User adoption: 1000+ active farmers in 6 months
- [ ] [ ] Feature usage: >70% using at least 3 modules
- [ ] [ ] NPS score: >50 (farmer satisfaction)
- [ ] [ ] AI recommendation accuracy: >75% farmer acceptance rate
- [ ] [ ] Cost savings: Farmers report average 15-20% input cost reduction
- [ ] [ ] Yield improvement: 10-15% yield increase for active users
- [ ] [ ] System uptime: >99.5%

---

## Notes

- **MVP Focus:** Modules 1-7 (existing improvements + farm management + weather = weeks 1-6)
- **Prioritize Farmers First:** Every feature must have clear ROI (money/time saved)
- **Regional Customization:** Support local crops, markets, schemes per region
- **Data Portability:** Export farmer data (CSV/JSON) for backup or switching
- **Continuous Learning:** Build feedback loop to improve ML models monthly
- **AI Docs:** `docs/FEATURES_AI_IMPLEMENTATION.md` is the detailed free-implementation guide for Phase 3 AI work; `docs/FEATURES_TODO.md` stays the main roadmap.

