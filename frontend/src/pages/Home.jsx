import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        // Just take first 6 for home page
        setProducts(data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-primary text-light min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 py-16 flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-5xl md:text-7xl font-bold tracking-widest text-center uppercase z-10"
        >
          NEED SOME DATES?
        </motion.h1>
        
        {/* Mockup blocks from design */}
        <div className="w-full max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2 bg-light/90 aspect-[16/9] rounded-md shadow-lg"></div>
          <div className="flex flex-col gap-4">
            <div className="bg-[#F2E9E4] aspect-square rounded-md shadow-lg flex items-center justify-center p-8">
               <h2 className="font-heading text-primary font-bold text-3xl text-center leading-tight tracking-wider">
                 PAHUJA<br/>TRADER'S
               </h2>
            </div>
            <div className="bg-light/90 flex-grow rounded-md shadow-lg"></div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-center font-heading text-2xl tracking-widest uppercase border-b-2 border-white/50 pb-2 inline-block mb-12 mx-auto flex w-fit">
          OUR PRODUCTS
        </h2>
        
        {loading ? (
          <div className="flex justify-center text-highlight"><p>Loading products...</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={product._id}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link to="/products" className="border border-white hover:bg-white hover:text-primary transition-colors duration-300 rounded-full px-6 py-2 text-sm uppercase tracking-wider font-semibold flex items-center">
            ALL PRODUCTS <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      {/* Reviews Section Mock */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-center font-heading text-2xl tracking-widest uppercase border-b-2 border-white/50 pb-2 inline-block mb-12 mx-auto flex w-fit">
          REVIEWS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-xl p-6 text-primary shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                   <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="user" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Radhika Babar</h4>
                  <p className="text-[10px] text-gray-500">Buyer (VIP)</p>
                </div>
                <div className="ml-auto text-yellow-500 text-sm">★ 5</div>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Fresh and premium quality dry fruits! Packaging was neat and the prices are quite reasonable. Really happy with the purchase.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
