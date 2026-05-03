import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      const fetchOrders = async () => {
        try {
          const config = { headers: { Authorization: `Bearer ${user.token}` } };
          const { data } = await axios.get('/api/orders/myorders', config);
          setOrders(data);
        } catch (error) {
          console.error("Error fetching orders", error);
        }
      };
      fetchOrders();
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="bg-primary text-light min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-center font-heading text-3xl tracking-widest uppercase border-b-2 border-white/50 pb-2 inline-block mb-10 mx-auto flex w-fit">
          PROFILE
        </h1>

        <div className="bg-white text-primary rounded-2xl p-8 shadow-xl mb-8 relative">
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="absolute top-8 right-8 text-sm text-red-500 font-bold hover:underline"
          >
            Logout
          </button>
          
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-heading font-bold text-gray-500">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold font-heading">{user.name}</h2>
              <p className="text-muted">{user.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Name</label>
              <div className="border-b pb-2 font-medium">{user.name}</div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Email</label>
              <div className="border-b pb-2 font-medium">{user.email}</div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
              <div className="border-b pb-2 font-medium">{user.phone || 'Not provided'}</div>
            </div>
          </div>
          
          {user.isAdmin && (
            <div className="mt-8 pt-6 border-t flex justify-center">
               <button onClick={() => navigate('/admin')} className="bg-secondary text-white py-2 px-8 rounded-full font-bold hover:bg-primary transition-colors">
                 Go to Admin Dashboard
               </button>
            </div>
          )}
        </div>

        <h2 className="text-center font-heading text-2xl tracking-widest uppercase border-b-2 border-white/50 pb-2 inline-block mb-8 mx-auto flex w-fit">
          ORDER HISTORY
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-muted">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white/10 p-6 rounded-xl border border-white/20">
                <div className="flex justify-between border-b border-white/20 pb-4 mb-4">
                  <div>
                    <p className="text-xs text-highlight uppercase">Order ID</p>
                    <p className="font-mono text-sm">{order._id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-highlight uppercase">Date</p>
                    <p className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-highlight uppercase">Total</p>
                    <p className="font-bold">Rs. {order.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                        <span>{item.name} <span className="text-highlight">x{item.qty}</span></span>
                      </div>
                      <span className="font-semibold">Rs. {(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
