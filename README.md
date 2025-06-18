# 🌦️ Weather Dashboard App

A modern Angular 19 standalone application that allows users to:
- Search for current weather by city
- View weather on an interactive map (Leaflet)
- Chat with a built-in weather assistant
- Display state-managed weather data with NgRx

---

## 🚀 Features

- 🔍 Search weather by city
- 🗺️ Map zoom using Leaflet when city is selected
- 💬 Chatbot with natural input like "Show weather for Paris"
- ⚙️ State management using `@ngrx/store` and `@ngrx/effects`
- 🧠 Smart coordination between weather API, state, and map
- 🧪 Unit-tested components and effects

---

## 🧰 Tech Stack

| Tech              | Usage                            |
|-------------------|----------------------------------|
| Angular 19        | Frontend framework               |
| NgRx Store        | State management                 |
| NgRx Effects      | Side-effect (API call) handling  |
| Leaflet           | Map integration and zoom         |
| OpenWeatherMap API| Weather data                     |
| Angular Material  | UI components (chatbot form etc.)|

---

## 📦 Installation

```bash
git clone https://github.com/rohan-cli/weather-dashboard-app.git
cd weather-dashboard-app
npm install
```

---

## ▶️ Run the App

```bash
ng serve
```

Visit [http://localhost:4200](http://localhost:4200)

---

## 🛠️ Environment Setup

1. Sign up for a free API key at [https://openweathermap.org](https://openweathermap.org)
2. Replace `YOUR_API_KEY` in `weather.effects.ts`

---

## 🗺️ Leaflet Map

- Uses OpenStreetMap tiles
- On city search or map click, zooms to coordinates
- Maintains zoom state via NgRx `coord` in store

---

## 🧪 Testing

Run unit tests:

```bash
ng test
```

- Includes tests for chatbot input parsing
- Effect test spies on NgRx `Actions`
- Map click emits coordinate events

---

## 📁 Folder Structure (high-level)

```
/src/app/
├── components/        // WeatherForm, MapView, Chatbot, Dashboard
├── state/             // NgRx actions, reducer, effects
├── app.component.ts   // Top-level container
├── main.ts            // Angular standalone bootstrapping
```

---

## 👤 Author

Rohan – [@rohan-cli](https://github.com/rohan-cli)
