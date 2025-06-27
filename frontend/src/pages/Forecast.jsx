import { useEffect, useState } from "react";
import API from "../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Forecast = () => {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");

  // Format number with commas
  const formatNumber = (value) => {
    return new Intl.NumberFormat("en-IN").format(Number(value));
  };

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => setError("Failed to fetch products"));
  }, []);

  const handleForecast = async () => {
    try {
      const res = await API.get(`/forcast/${selectedId}`);
      setForecast(res.data);
      setError("");
    } catch {
      setError("Failed to fetch forecast");
    }
  };

  const chartData = forecast?.chartData
  ? forecast.chartData.map((entry) => ({
      day: new Date(entry.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      demand: entry.quantity,
    }))
  : [];


  const selectedProduct = products.find((p) => p._id === forecast?.productId);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 Demand Forecast</h2>

      <div className="flex gap-4 mb-4">
        <select
          className="p-2 border rounded w-full"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">Select a product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleForecast}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          disabled={!selectedId}
        >
          Forecast
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {forecast && (
        <div className="bg-white rounded-lg shadow p-6 animate-fade-in">
          <h3 className="text-lg font-semibold mb-2">
            Forecast for{" "}
            <span className="text-blue-600">{selectedProduct?.name || "Selected Product"}</span>
          </h3>

          <p className="mb-2 text-sm text-gray-700">
            Avg Daily Sales:{" "}
            <strong>{formatNumber(forecast.averageDailySales)}</strong>
          </p>

          <p className="mb-2 text-sm text-gray-700">
            30-Day Forecast:{" "}
            <strong>{formatNumber(forecast.forecast)}</strong>
          </p>

          <p className="mb-4 text-sm text-gray-700">
            Total OUT Transactions:{" "}
            <strong>{formatNumber(forecast.totalOutTransactions)}</strong>{" "}
            | Total Quantity Sold:{" "}
            <strong>{formatNumber(forecast.totalQuantitySold)}</strong>
          </p>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="day" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="demand" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Forecast;
