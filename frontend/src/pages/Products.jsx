import { useEffect, useState } from "react";
import API from "../services/api";
import { FiEdit, FiTrash2, FiSave, FiX, FiPlus } from "react-icons/fi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    quantity: 0,
    threshold: 0,
    price: 0,
    supplier: ""
  });

  const handleSave = async (id) => {
    try {
      const res = await API.put(`/products/${id}`, editedProduct);
      setProducts((prev) =>
        prev.map((prod) => (prod._id === id ? res.data : prod))
      );
      setEditingId(null);
    } catch (err) {
      setError("Update failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((prod) => prod._id !== id));
    } catch (err) {
      setError("Failed to delete product: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  const handleAddProduct = async () => {
    try {
      const res = await API.post("/products", newProduct);
      setProducts(prev => [...prev, res.data]);
      setIsAdding(false);
      setNewProduct({
        name: "",
        quantity: 0,
        threshold: 0,
        price: 0,
        supplier: ""
      });
    } catch (err) {
      setError("Failed to add product: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Inventory Products</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md"
        >
          <FiPlus /> Add Product
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 animate-shake">
          {error}
        </div>
      )}

      {isAdding && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Add New Product</h2>
            <button 
              onClick={() => setIsAdding(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "quantity", "threshold", "price", "supplier"].map((key) => (
              <div key={key} className="space-y-1">
                <label className="text-sm font-medium text-gray-700 capitalize">
                  {key === "sku" ? "SKU" : key}
                </label>
                <input
                  type={key === "quantity" || key === "threshold" || key === "price" ? "number" : "text"}
                  value={newProduct[key]}
                  onChange={(e) => setNewProduct({...newProduct, [key]: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                  min={key === "quantity" || key === "threshold" || key === "price" ? "0" : undefined}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleAddProduct}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md"
          >
            Save Product
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Threshold</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((p) => (
                  <tr 
                    key={p._id} 
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === p._id ? (
                        <input
                          type="text"
                          value={editedProduct.name || ''}
                          onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900">{p.name}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {p.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === p._id ? (
                        <input
                          type="number"
                          value={editedProduct.quantity || ''}
                          onChange={(e) => setEditedProduct({...editedProduct, quantity: e.target.value})}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      ) : (
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          p.quantity <= p.threshold ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {p.quantity}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingId === p._id ? (
                        <input
                          type="number"
                          value={editedProduct.threshold || ''}
                          onChange={(e) => setEditedProduct({...editedProduct, threshold: e.target.value})}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      ) : (
                        p.threshold
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingId === p._id ? (
                        <input
                          type="number"
                          value={editedProduct.price || ''}
                          onChange={(e) => setEditedProduct({...editedProduct, price: e.target.value})}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                          step="0.01"
                        />
                      ) : (
                        `₹${p.price.toLocaleString()}`
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingId === p._id ? (
                        <input
                          type="text"
                          value={editedProduct.supplier || ''}
                          onChange={(e) => setEditedProduct({...editedProduct, supplier: e.target.value})}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        p.supplier
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        p.quantity <= p.threshold ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {p.quantity <= p.threshold ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingId === p._id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleSave(p._id)}
                            className="text-green-600 hover:text-green-900 flex items-center"
                          >
                            <FiSave className="mr-1" /> Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-gray-600 hover:text-gray-900 flex items-center"
                          >
                            <FiX className="mr-1" /> Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingId(p._id);
                              setEditedProduct(p);
                            }}
                            className="text-yellow-600 hover:text-yellow-900 flex items-center"
                          >
                            <FiEdit className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <FiTrash2 className="mr-1" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {products.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                      No products found. Add your first product!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;