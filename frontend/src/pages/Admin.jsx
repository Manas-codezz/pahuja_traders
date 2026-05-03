import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Edit, Trash2, Plus } from 'lucide-react';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    } else {
      fetchProducts();
    }
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.post('/api/products', {}, config);
        fetchProducts(); // refresh
      } catch (error) {
        alert(error.response?.data?.message || 'Error creating product');
      }
    }
  };

  const deleteProductHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`/api/products/${id}`, config);
        fetchProducts(); // refresh
      } catch (error) {
        alert(error.response?.data?.message || 'Error deleting product');
      }
    }
  };

  const updatePriceHandler = async (id, currentPrice) => {
    const newPrice = prompt(`Enter new price (Current: Rs. ${currentPrice}):`, currentPrice);
    if (newPrice && !isNaN(newPrice)) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.put(`/api/products/${id}`, { price: Number(newPrice) }, config);
        fetchProducts();
      } catch (error) {
        alert(error.response?.data?.message || 'Error updating price');
      }
    }
  };

  if (!user || !user.isAdmin) return null;

  return (
    <div className="bg-light text-primary min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading text-3xl font-bold tracking-wider">ADMIN DASHBOARD</h1>
          <button 
            onClick={createProductHandler}
            className="bg-primary text-white hover:bg-secondary px-4 py-2 rounded-md font-bold flex items-center transition-colors shadow-md"
          >
            <Plus size={18} className="mr-2" /> Add Product
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-sm uppercase text-gray-500 border-b">
                <th className="p-4">ID</th>
                <th className="p-4">NAME</th>
                <th className="p-4">PRICE</th>
                <th className="p-4">CATEGORY</th>
                <th className="p-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-xs font-mono text-gray-400">{product._id}</td>
                  <td className="p-4 font-semibold">{product.name}</td>
                  <td className="p-4 font-bold text-green-600">Rs. {product.price.toFixed(2)}</td>
                  <td className="p-4 text-sm">{product.category}</td>
                  <td className="p-4 flex justify-center space-x-3">
                    <button 
                      onClick={() => updatePriceHandler(product._id, product.price)}
                      className="bg-highlight/30 text-primary hover:bg-highlight px-3 py-1 rounded text-xs font-bold transition-colors"
                    >
                      Update Price
                    </button>
                    {/* Add full edit page link later, for now just use update price handler */}
                    <button className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded">
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => deleteProductHandler(product._id)}
                      className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
             <div className="p-8 text-center text-muted">No products found. Add a new product to see it here.</div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Admin;
