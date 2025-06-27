import { useEffect, useState } from "react";
import API from "../services/api";

const TransactionsHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await API.get("/transactions");
        setTransactions(res.data);
      } catch (err) {
        setError("Failed to fetch transactions");
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Transaction History</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((tx) => (
              <tr key={tx._id}>
                <td className="px-6 py-4 whitespace-nowrap">{tx.productId?.name || "Deleted"}</td>
                <td className={`px-6 py-4 font-semibold ${tx.type === "IN" ? "text-green-600" : "text-red-600"}`}>
                  {tx.type}
                </td>
                <td className="px-6 py-4">{tx.quantity}</td>
                <td className="px-6 py-4">{new Date(tx.date).toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-600">{tx.note || "-"}</td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsHistory;
