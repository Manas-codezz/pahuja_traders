import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, user } = useContext(AuthContext);
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
    const res = await login(email, password);
    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-light flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px]">
        
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white relative">
          <h2 className="text-4xl font-bold font-heading text-primary text-center mb-10">Login</h2>
          
          {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">YOUR EMAIL OR CONTACT</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">PASSWORD</label>
                <a href="#" className="text-xs text-muted hover:text-primary">Forgot your password?</a>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="w-full bg-secondary hover:bg-primary text-white py-4 rounded-lg font-bold tracking-wide transition-colors mt-8 shadow-md">
              Sign In
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center space-x-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="text-sm text-gray-400 uppercase">Or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <button className="mt-6 w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-3" />
            <span className="font-semibold text-gray-700">Sign in with Google</span>
          </button>
        </div>

        {/* Right Side - Image/Signup Link */}
        <div className="w-full md:w-1/2 bg-primary relative hidden md:flex flex-col items-center justify-center text-center p-12 overflow-hidden">
          {/* Overlay gradient over a dummy image background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/90 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center z-0 opacity-50"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}
          ></div>
          
          <div className="relative z-20">
            <h2 className="text-4xl font-heading font-bold text-white mb-6 tracking-wide">Hello Friend</h2>
            <p className="text-light text-sm mb-10 leading-relaxed max-w-sm mx-auto">
              To keep connected with us please login with your personal info
            </p>
            <Link to={`/signup?redirect=${redirect}`} className="border-2 border-white text-white hover:bg-white hover:text-primary py-3 px-12 rounded-full font-bold tracking-widest transition-colors inline-block uppercase text-sm">
              Sign Up
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
