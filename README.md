# 🚀 SmartInventory Pro

A full-stack, backend-heavy inventory management system built to track product stock, handle real-time transactions, and intelligently forecast product demand using recent data analytics.

> Built with a strong focus on backend architecture, authentication, clean APIs, and practical business logic.

---

## 📸 Demo

🖥️ **[(https://youtu.be/g6KSHLl0BCI)]**  
🎯 Features shown: Product CRUD, Authentication, Transactions, Demand Forecasting with Graphs

---
## 🗂️ Project Structure

```
/backend
├── config/           # Environment configs, DB connection
├── controllers/      # Route logic (products, auth, transactions, forecast)
├── middlewares/      # Auth, error handling, validation
├── models/           # Mongoose schemas (User, Product, Transaction)
├── routes/           # Express route definitions
├── services/         # Business logic, forecasting, helpers
├── utils/            # Utility functions, constants
└── app.js            # Main Express app entry

/frontend
├── public/           # Static assets (favicon, images)
├── src/
│   ├── components/   # Reusable UI components (tables, modals, charts)
│   ├── pages/        # Route-based pages (Dashboard, Products, etc.)
│   ├── services/     # API calls, data fetching
│   ├── hooks/        # Custom React hooks
│   ├── utils/        # Frontend helpers, constants
│   ├── styles/       # Tailwind config, custom CSS
│   └── App.jsx       # Main React app entry
└── package.json      # Frontend dependencies
```

## 🚧 Features Implemented

### 🔐 Authentication & Access Control
- JWT-based secure login/register APIs.
- HTTP-only cookie storage for session security.
- `isAuthenticated` middleware to protect APIs.

---

### 📦 Inventory (Products)
- **CRUD operations** for product management.
- **Auto-generated SKU** based on product name.
- Real-time status:
  - `Low Stock` vs `In Stock` indicator (based on `threshold`).
- **Editable inline UI** for:
  - Name, Quantity, Threshold, Price, Supplier
- Add new products using UI modal (no separate page).

---

### 🔁 Transactions
- Add `IN` (stock added) or `OUT` (stock reduced) transactions.
- On each `OUT`, product quantity is decreased.
- Product validations to ensure no negative stock.
- Transactions reflect live changes in product quantity.
- History accessible from dashboard.

---

### 📊 Demand Forecast (Microservice)
- Forecasts next **30-day demand** using last 60 days of `OUT` transactions.
- Returns:
  - 📈 Average Daily Sales
  - 🔁 Total Quantity Sold
  - 🔢 Total `OUT` Transactions
- UI: Beautiful **bar chart** using `Recharts`.
- Accessible via Forecast page with dropdown selection.

---

### 🧑‍💼 Dashboard (UI)
- Centralized dashboard with routes to:
  - Products
  - Transactions
  - Demand Forecast
- One-click navigation.
- View recent transactions directly from dashboard.
- Basic transition animations and Tailwind-styled layout.

---

## 🛠 Tech Stack

| Layer       | Stack                                  |
|-------------|-----------------------------------------|
| Frontend    | React.js, Tailwind CSS, Axios, Recharts |
| Backend     | Node.js, Express, MongoDB (Mongoose)    |
| Auth        | JWT, Cookies (HTTP-only)                |
| Styling     | TailwindCSS, Icons, Utility Classes     |
| Charts      | Recharts (Responsive + Clean UI)        |
| Deployment  | Local (easily deployable)               |

---

## 💡 How It Works

- **Login/Register** → receive secure cookie.
- **/products** (GET, POST, PUT, DELETE) → all secured with auth middleware.
- **/transactions** → modifies product quantity live.
- **/forecast/:productId** → uses recent `OUT` data to forecast demand.
- **UI Pages**:
  - `/products` → Inventory management with edit/delete
  - `/transactions` → Create/view all transactions
  - `/forecast` → Select a product to forecast demand
  - `/dashboard` → Navigation hub with preview cards

---

## 📈 Future Improvements

### 🔮 Backend Enhancements
- Redis caching for frequently accessed endpoints
- Notification microservice for low-stock alerts
- Role-based admin dashboard for different user types
- REST → GraphQL upgrade for flexible frontend queries

### 🧑‍💻 Frontend Enhancements
- Filter/sort/search on product and transaction tables
- Export data to CSV/Excel
- Paginated UI for large datasets

### ☁️ Deployment & Scaling
- Dockerize app for containerized deployment
- Use MongoDB Atlas + Render/Vercel for deployment
- Split forecast as a true standalone microservice
- Add unit/integration tests using Jest and Supertest

---

## ✅ Status

> **Project Completed: Fully Working Locally ✅**  
All major features implemented and tested with mock and real transaction data.

---

## 🙌 Author

**Atharva Pandey**  
📫 [LinkedIn](https://www.linkedin.com/in/atharva-pandey/)
