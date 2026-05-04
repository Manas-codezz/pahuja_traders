import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// IMPORT IMAGES
import cashew from "../assets/cashew.png";
import almond from "../assets/almond.png";
import walnut from "../assets/walnut.png";
import dates from "../assets/dates.png";
import raisins from "../assets/raisins.png";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
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
    <div className="bg-gradient-to-br from-[#2B2D42] to-[#4A4E69] text-white min-h-screen overflow-hidden relative">
      {/* FLOATING DECOR IMAGES */}
      <img
        src={almond}
        className="absolute top-2 right-95% w-72 opacity-80 rotate-12"
      />
      <img src={almond} className="absolute top-2 right-16 w-70 rotate-120" />
      <img src={walnut} className="absolute bottom-140 left-8 w-76" />
      <img src={walnut} className="absolute top-172 right-10 w-76" />
      <img src={cashew} className="absolute bottom-10 left-0 w-70" />
      <img src={raisins} className="absolute bottom-10 right-0 w-70" />

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-90% md:text-7xl font-extrabold tracking-widest uppercase "
        >
          NEED SOME DATES?
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="opacity-80 text-90% md:text-7xl font-extrabold hollow tracking-widest uppercase"
        >
          NEED SOME DATES?
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: -70 }}
          animate={{ opacity: 1, y: 0 }}
          className=" text-90% md:text-7xl font-extrabold hollow tracking-widest uppercase"
        >
          NEED SOME DATES?
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: -110 }}
          animate={{ opacity: 1, y: 0 }}
          className=" text-90% md:text-7xl font-extrabold  tracking-widest uppercase"
        >
          NEED SOME DATES?
        </motion.h1>
        {/* CENTER DATES IMAGE */}
        <img
          src={dates}
          className="absolute left-120  mt-0 top-19 w-75 drop-shadow-2xl"
        />

        {/* HERO BLOCKS */}
        <div className="grid md:grid-cols-3 gap-6 mt-40 max-w-5xl mx-auto">
          {/* LEFT BIG BOX */}
          <div className="md:col-span-2 bg-[#F2E9E4] h-64 rounded-lg shadow-xl" />

          {/* RIGHT STACK */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#F2E9E4] h-32 rounded-lg flex items-center justify-center shadow-xl">
              <h2 className="text-[#2B2D42] text-2xl font-bold tracking-widest text-center">
                PAHUJA <br /> TRADER'S
              </h2>
            </div>

            <div className="bg-[#F2E9E4] h-28 rounded-lg shadow-xl" />
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-center text-xl tracking-[4px] uppercase border-b border-white/40 pb-2 mb-12 w-fit mx-auto">
          OUR PRODUCTS
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link
            to="/products"
            className="border border-white rounded-full px-6 py-2 hover:bg-white hover:text-[#2B2D42] transition"
          >
            ALL PRODUCTS →
          </Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-center text-xl tracking-[4px] uppercase border-b border-white/40 pb-2 mb-12 w-fit mx-auto">
          REVIEWS
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white text-[#2B2D42] rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-3">
                <img
                  src={`https://i.pravatar.cc/100?img=${i}`}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="font-semibold text-sm">Radhika Babar</p>
                  <p className="text-xs text-gray-500">Bhopal (MP)</p>
                </div>
                <span className="ml-auto text-yellow-500">★ 5</span>
              </div>

              <p className="text-xs leading-relaxed">
                Fresh and premium quality dry fruits! Packaging was neat and the
                prices are quite reasonable.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm"></footer>
    </div>
  );
};

export default Home;
