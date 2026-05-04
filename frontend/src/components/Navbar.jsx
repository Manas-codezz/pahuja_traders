import { Link, useLocation } from "react-router-dom";
import { User, ShoppingCart, Menu, X } from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { pathname } = useLocation();

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "CART", path: "/cart" },
    { name: "CONTACT US", path: "/contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#2B2D42] to-[#4A4E69] text-white px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LEFT LOGO */}
        <Link
          to="/"
          className="text-xl font-heading tracking-[3px] leading-tight"
        >
          PAHUJA
          <br />
          TRADER'S
        </Link>

        {/* CENTER NAV */}
        <div className="hidden md:flex items-center gap-10 text-sm tracking-[4px]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative text-white/80 hover:text-white transition"
            >
              {link.name}

              {/* ACTIVE UNDERLINE */}
              {pathname === link.path && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-white"></span>
              )}
            </Link>
          ))}
        </div>

        {/* RIGHT ICONS */}
        <div className="hidden md:flex items-center gap-6">
          {/* CART */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-[#2B2D42] text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </Link>

          {/* PROFILE ICON (CIRCLE STYLE) */}
          <Link
            to={user ? "/profile" : "/login"}
            className="border border-white/50 rounded-full p-2 hover:bg-white hover:text-[#2B2D42] transition"
          >
            <User size={18} />
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center gap-6 py-6 border-t border-white/20">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="tracking-[3px] text-lg"
            >
              {link.name}
            </Link>
          ))}

          <div className="flex gap-6 pt-4">
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="relative"
            >
              <ShoppingCart size={26} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#2B2D42] text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>

            <Link
              to={user ? "/profile" : "/login"}
              onClick={() => setIsOpen(false)}
            >
              <User size={26} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;