import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const res = await register(name, email, password);
    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-light flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[650px]">
        
        {/* Left Side - Image/Login Link */}
        <div className="w-full md:w-1/2 bg-[#5c4a45] relative hidden md:flex flex-col items-center justify-center text-center p-12 overflow-hidden order-2 md:order-1">
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/10 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center z-0 opacity-80"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505253668822-42074d58a7c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}
          ></div>
          
          <div className="relative z-20">
            <h2 className="text-4xl font-heading font-bold text-white mb-6 tracking-wide drop-shadow-md">Welcome Back</h2>
            <p className="text-light text-sm mb-10 leading-relaxed max-w-sm mx-auto drop-shadow-md">
              To keep connected with us please login with your personal info
            </p>
            <Link to={`/login?redirect=${redirect}`} className="bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white text-white py-3 px-12 rounded-full font-bold tracking-widest transition-colors inline-block uppercase text-sm shadow-lg">
              Sign In
            </Link>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative order-1 md:order-2">
          <h2 className="text-4xl font-bold font-heading text-black text-center mb-8">Sign Up</h2>
          
          {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">YOUR NAME</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors shadow-sm"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">EMAIL</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors shadow-sm"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">PASSWORD</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors shadow-sm"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">CONFIRM PASSWORD</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors shadow-sm"
                placeholder="Confirm your password"
              />
            </div>

            <button type="submit" className="w-full bg-[#4c5180] hover:bg-primary text-white py-3.5 rounded-md font-bold transition-colors mt-6 shadow-md">
              Sign Up
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="text-xs text-gray-400 uppercase">Or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <button className="mt-4 w-full flex items-center justify-center py-2.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-sm">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4 mr-3" />
            <span className="font-semibold text-gray-600 text-sm">Sign up with Google</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Signup;
