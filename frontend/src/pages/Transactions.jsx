import { useState, useEffect } from "react";
import API from "../services/api";

const Transactions = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    quantity: 1,
    type: "IN",
    note: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/transactions", form);
      setSuccess("Transaction successful");
      setForm({ productId: "", quantity: 1, type: "IN", note: "" });
    } catch (err) {
      setError(err.response?.data?.error || "Transaction failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Record Transaction</h2>

      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium">Product</label>
          <select
            value={form.productId}
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} (Qty: {p.quantity})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Quantity</label>
          <input
            type="number"
            min="1"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Note (optional)</label>
          <input
            type="text"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">
          Submit Transaction
        </button>
      </form>
    </div>
  );
};

export default Transactions;
