import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, clearCart, cartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login?redirect=cart');
      return;
    }

    try {
      // Mock Checkout
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        totalPrice: cartTotal
      }, config);

      alert(`Order placed successfully! Order ID: ${data._id}`);
      clearCart();
      navigate('/profile');
    } catch (error) {
      alert(error.response?.data?.message || 'Error placing order');
    }
  };

  return (
    <div className="bg-primary text-light min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        
        <h1 className="text-center font-heading text-3xl tracking-widest uppercase border-b-2 border-white/50 pb-2 inline-block mb-10 mx-auto flex w-fit">
          YOUR CART
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center mt-20">
            <h2 className="text-2xl mb-6">Your cart is currently empty.</h2>
            <Link to="/products" className="bg-highlight text-primary px-6 py-3 rounded-full font-bold hover:bg-white transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white text-primary rounded-2xl overflow-hidden shadow-xl p-6 md:p-8">
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <motion.div 
                  key={item.product}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 gap-4"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <span className="text-muted text-sm">{index + 1}.</span>
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <Link to={`/product/${item.product}`} className="font-heading font-bold text-lg hover:text-secondary">{item.name}</Link>
                      <p className="text-muted text-xs">Premium Grade</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between w-full sm:w-auto sm:gap-10">
                    <span className="font-bold whitespace-nowrap">Rs. {item.price.toFixed(2)} <span className="text-xs text-muted font-normal">/kg</span></span>
                    
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <button onClick={() => updateQty(item.product, Math.max(1, item.qty - 1))} className="px-2 py-1 bg-gray-100 hover:bg-gray-200">-</button>
                      <span className="px-4 py-1 font-semibold">{item.qty}</span>
                      <button onClick={() => updateQty(item.product, item.qty + 1)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200">+</button>
                    </div>

                    <button onClick={() => removeFromCart(item.product)} className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-full">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <div className="w-full sm:w-1/2 bg-gray-50 p-6 rounded-xl border">
                <div className="flex justify-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-bold">Rs. {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4 pb-4 border-b">
                  <span className="text-muted">Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between mb-6 text-xl">
                  <span className="font-heading font-bold">Total</span>
                  <span className="font-bold">Rs. {cartTotal.toFixed(2)}</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-full font-bold tracking-wide transition-colors"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
