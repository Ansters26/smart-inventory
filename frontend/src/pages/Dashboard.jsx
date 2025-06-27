import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiBox,
  FiTrendingUp,
  FiAlertTriangle,
  FiLogOut,
  FiBarChart2,
  FiPackage
} from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    navigate("/");
  };

  const cards = [
    {
      title: "Manage Products",
      subtitle: "Add, edit or delete inventory items",
      icon: <FiBox className="text-blue-600 text-3xl" />,
      to: "/products",
    },
    {
      title: "Transaction Logs",
      subtitle: "Track IN & OUT inventory movement",
      icon: <FiTrendingUp className="text-green-600 text-3xl" />,
      to: "/transactions-history",
    },
    {
  title: "Record Transaction",
  subtitle: "Add IN or OUT inventory movement",
  icon: <FiPackage className="text-purple-600 text-3xl" />,
  to: "/transactions",
},
    {
      title: "Low Stock Alerts",
      subtitle: "Identify low stock products quickly",
      icon: <FiAlertTriangle className="text-red-600 text-3xl" />,
      to: "/alerts",
    },
    {
      title: "Forecast Demand",
      subtitle: "AI-based 30-day demand projection",
      icon: <FiBarChart2 className="text-purple-600 text-3xl" />,
      to: "/forecast",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 sm:p-10 transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Welcome to <span className="text-blue-600">SmartInventory Pro</span> 🚀
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition"
          >
            <FiLogOut className="text-lg" /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.to}
              className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 flex items-start gap-4 border border-transparent hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
            >
              {card.icon}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {card.title}
                </h2>
                <p className="text-sm text-gray-500">{card.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
