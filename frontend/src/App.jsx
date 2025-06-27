import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import Transactions from "./pages/Transactions";
import TransactionsHistory from "./pages/TransactionHistory";
import Alerts from "./pages/Alerts";
import Forecast from "./pages/Forecast";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
      <Route path="/transactions-history" element={<ProtectedRoute><TransactionsHistory /></ProtectedRoute>} />
      <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
      <Route path='/forecast' element={<ProtectedRoute><Forecast/></ProtectedRoute>}/>
    </Routes>
  );
};

export default App;
