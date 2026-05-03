import { Link } from 'react-router-dom';
import { User, ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CART', path: '/cart' },
    { name: 'CONTACT US', path: '/contact' },
  ];

  return (
    <nav className="bg-secondary text-light px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-heading font-bold tracking-wider">
          PAHUJA<br />TRADER'S
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center text-sm font-semibold tracking-wider">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="hover:text-highlight transition-colors duration-300">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-6 relative">
          <Link to="/cart" className="hover:text-highlight transition-colors relative">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-highlight text-primary text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </Link>
          <Link to={user ? "/profile" : "/login"} className="hover:text-highlight transition-colors border-2 border-transparent rounded-full hover:border-highlight p-1">
            <User size={24} />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-4 flex flex-col items-center border-t border-muted pt-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-lg font-semibold w-full text-center py-2 hover:bg-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex space-x-6 pt-4">
            <Link to="/cart" onClick={() => setIsOpen(false)} className="relative">
              <ShoppingCart size={28} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-highlight text-primary text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>
            <Link to={user ? "/profile" : "/login"} onClick={() => setIsOpen(false)}>
              <User size={28} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
