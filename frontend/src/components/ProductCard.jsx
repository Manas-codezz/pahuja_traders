import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col items-center p-4 relative"
    >
      <div className="w-full h-48 flex justify-center items-center mb-4 bg-gray-50 rounded-xl overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} className="max-h-full object-cover hover:scale-105 transition-transform duration-500" />
        </Link>
      </div>
      
      <div className="w-full text-left flex-grow">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-heading font-semibold text-lg text-primary line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-muted text-xs mt-1 line-clamp-2 h-8">{product.description}</p>
      </div>
      
      <div className="w-full flex justify-between items-center mt-4">
        <span className="font-bold text-sm text-primary">Rs. {product.price.toFixed(2)} <span className="text-xs font-normal text-muted">/ kg</span></span>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart(product, 1)}
          className="bg-gray-200 hover:bg-highlight text-primary text-xs font-semibold py-1.5 px-3 rounded-full flex items-center transition-colors"
        >
          Buy Now <span className="ml-1 text-[10px]">▶</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
