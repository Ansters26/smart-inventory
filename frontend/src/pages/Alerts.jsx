import { useEffect, useState } from "react";
import API from "../services/api";
import { FiAlertTriangle, FiCheckCircle, FiRefreshCw,FiAlertCircle } from "react-icons/fi";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchAlerts = async () => {
  try {
    setIsLoading(true);
    const res = await API.get("/alerts");
    setAlerts(res.data.lowStockProducts || []);
    setLastUpdated(new Date().toLocaleTimeString());
  } catch (err) {
    setError(err.response?.data?.message || "Failed to fetch alerts");
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <FiAlertTriangle className="text-red-500" size={24} />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Low Stock Alerts</h2>
          {alerts.length > 0 && (
            <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
              {alerts.length} Alert{alerts.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated}
            </p>
          )}
          <button
            onClick={fetchAlerts}
            disabled={isLoading}
            className="flex items-center gap-2 text-sm bg-white border border-gray-200 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
          >
            <FiRefreshCw className={`${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded animate-shake">
          <div className="flex items-center">
            <FiAlertCircle className="mr-2" size={18} />
            <span>{error}</span>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500 mb-4"></div>
          <p className="text-gray-600">Loading alerts...</p>
        </div>
      ) : alerts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <FiCheckCircle className="mx-auto text-green-500 mb-3" size={48} />
          <h3 className="text-xl font-medium text-gray-800 mb-2">All good!</h3>
          <p className="text-gray-500">No low stock alerts at the moment</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-red-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Current Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Threshold</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {alerts.map((alert) => {
                  const difference = alert.quantity - alert.threshold;
                  const percentage = Math.round((alert.quantity / alert.threshold) * 100);
                  
                  return (
                    <tr key={alert._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{alert.name}</div>
                        {alert.supplier && (
                          <div className="text-sm text-gray-500">Supplier: {alert.supplier}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.sku}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {alert.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{alert.threshold}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${
                            difference >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {difference}
                          </span>
                          <div className="ml-2 w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                percentage >= 100 ? 'bg-green-500' : 
                                percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(100, percentage)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;