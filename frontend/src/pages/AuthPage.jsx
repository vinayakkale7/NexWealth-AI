import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Check, Sparkles, LineChart, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useAppStore from '../store/useAppStore';

const FloatingInput = ({ icon: Icon, type, label, value, onChange, required, togglePassword, isPasswordType }) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;
  
  return (
    <div className="relative">
      <div className={`absolute inset-0 rounded-xl transition-colors duration-300 ${focused ? 'bg-white/10 border-accent-teal/50' : 'bg-black/20 border-white/10'} border pointer-events-none`} />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors duration-300">
        <Icon size={18} className={focused ? 'text-accent-teal' : ''} />
      </div>
      <label className={`absolute left-11 transition-all duration-300 pointer-events-none ${isActive ? 'top-2 text-[10px] text-text-secondary uppercase tracking-wider font-semibold' : 'top-1/2 -translate-y-1/2 text-sm text-text-muted'}`}>
        {label}
      </label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        onFocus={() => setFocused(true)} 
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full h-[60px] bg-transparent pl-11 pr-12 pt-5 pb-1 text-white text-sm font-medium outline-none rounded-xl"
      />
      {togglePassword && (
        <button 
          type="button" 
          onClick={togglePassword} 
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors focus:outline-none"
        >
           {isPasswordType ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Store
  const login = useAppStore(state => state.login);
  const register = useAppStore(state => state.register);
  const isLoading = useAppStore(state => state.isLoading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
        toast.success('Successfully logged in!');
        navigate('/app');
      } else {
        await register(email, password, fullName);
        toast.success('Account created successfully!');
        navigate('/app');
      }
    } catch (err) {
      const errorDetail = err.response?.data?.detail || 'An error occurred. Please try again.';
      toast.error(errorDetail);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background text-text-primary overflow-hidden font-sans">
      
      {/* Left Section (60%) - Visuals */}
      <div className="hidden lg:flex relative w-[60%] flex-col justify-between p-12 overflow-hidden border-r border-white/5 bg-gradient-to-br from-background via-black to-background">
        
        {/* Animated Mesh Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-teal/10 rounded-full blur-[120px] mix-blend-screen animate-blob pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000 pointer-events-none" />
        
        {/* Grid Pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMWgyMHYyMEgxVjF6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-50 pointer-events-none" />

        {/* Top Branding */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 cursor-pointer group w-max" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-teal to-accent-blue flex items-center justify-center shadow-glow group-hover:-translate-y-0.5 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">NexWealth AI</span>
          </div>
        </div>

        {/* Floating Widgets Area */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-12">
          
          <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
            
            {/* Widget 1: Main Dashboard Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, type: 'spring' }}
              className="glass-panel p-8 rounded-3xl border border-white/10 shadow-premium w-full max-w-lg bg-background/40 backdrop-blur-xl relative z-10"
            >
              <h1 className="text-4xl font-black text-white leading-[1.1] tracking-tighter mb-4">
                Wealth <br /> Meets Intelligence.
              </h1>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Consolidate, analyze, and optimize your entire family portfolio automatically. Built for those who demand precision.
              </p>
              
              <div className="h-2 w-1/3 bg-gradient-to-r from-accent-teal via-accent-blue to-accent-purple rounded-full" />
            </motion.div>

            {/* Widget 2: Portfolio Performance */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }} 
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} 
              className="absolute right-[-10%] top-[10%] glass-panel p-6 rounded-3xl border border-white/10 shadow-premium w-72 bg-background/60 backdrop-blur-2xl z-20 hidden xl:block"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-accent-teal/10 border border-accent-teal/20 flex items-center justify-center shadow-inner">
                   <LineChart className="w-6 h-6 text-accent-teal" />
                </div>
                <div className="text-xs font-bold text-accent-emerald bg-accent-emerald/10 px-2.5 py-1.5 rounded-lg border border-accent-emerald/20">+18.4%</div>
              </div>
              <div className="text-sm font-semibold text-text-secondary uppercase tracking-widest mb-1">Total Net Worth</div>
              <div className="text-4xl font-black text-white tracking-tighter drop-shadow-sm">₹1.24 Cr</div>
            </motion.div>

            {/* Widget 3: AI Advisor */}
            <motion.div 
              animate={{ y: [10, -10, 10] }} 
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }} 
              className="absolute left-[-10%] bottom-[10%] glass-panel p-5 rounded-3xl border border-white/10 shadow-premium w-80 bg-background/60 backdrop-blur-2xl z-20 hidden xl:block"
            >
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shadow-glow-purple border border-white/20">
                    <Sparkles className="w-4 h-4 text-white" />
                 </div>
                 <span className="text-sm font-bold text-white tracking-wide">AI Tax Advisor</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-text-primary leading-relaxed shadow-inner">
                Harvest <span className="font-bold text-accent-emerald">₹42,000</span> in short-term capital losses from HDFC Bank to offset recent gains.
              </div>
            </motion.div>

          </div>
        </div>
        
        {/* Footer info */}
        <div className="relative z-10 flex justify-between text-xs font-medium text-text-muted uppercase tracking-widest">
          <span>AES-256 Encrypted</span>
          <span>Bank-grade Security</span>
        </div>
      </div>

      {/* Right Section (40%) - Form */}
      <div className="w-full lg:w-[40%] min-h-screen flex items-center justify-center p-6 sm:p-12 relative z-20">
        
        {/* Mobile Background Blob */}
        <div className="lg:hidden absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-accent-teal/10 rounded-full blur-[80px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[440px] glass-panel rounded-[24px] p-8 sm:p-10 shadow-premium relative bg-background/80 backdrop-blur-3xl border border-white/10"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-teal to-accent-blue flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">NexWealth</span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-sm text-text-secondary mb-8">
            {isLogin ? 'Enter your details to access your workspace' : 'Start managing your family wealth with AI'}
          </p>

          <button 
            type="button" 
            className="w-full h-[52px] mb-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white/20 shadow-inner"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">or</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AnimatePresence>
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }} 
                  className="overflow-hidden"
                >
                  <FloatingInput 
                    icon={User} 
                    label="Full Name" 
                    type="text" 
                    value={fullName} 
                    onChange={e => setFullName(e.target.value)} 
                    required={!isLogin} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            <FloatingInput 
              icon={Mail} 
              label="Email Address" 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
            
            <FloatingInput 
              icon={Lock} 
              label="Password" 
              type={showPassword ? 'text' : 'password'} 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              togglePassword={() => setShowPassword(!showPassword)} 
              isPasswordType={!showPassword} 
            />

            {isLogin && (
              <div className="flex items-center justify-between mt-2 mb-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${rememberMe ? 'bg-accent-teal border-accent-teal' : 'bg-black/20 border-white/20 group-hover:border-accent-teal/50'}`}>
                    {rememberMe && <Check size={12} className="text-background stroke-[3]" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                  <span className="text-xs font-medium text-text-secondary group-hover:text-white transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-xs font-semibold text-accent-teal hover:text-white transition-colors">Forgot password?</a>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full h-[52px] mt-2 rounded-xl bg-gradient-to-r from-accent-teal via-accent-blue to-accent-purple text-white font-bold text-sm flex items-center justify-center hover:opacity-90 transition-all shadow-glow hover:shadow-glow-purple disabled:opacity-50 disabled:cursor-not-allowed group focus:outline-none focus:ring-2 focus:ring-accent-teal/50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="group-hover:scale-105 transition-transform">{isLogin ? 'Sign in' : 'Create account'}</span>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-text-secondary">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              onClick={() => {
                setIsLogin(!isLogin);
                setFullName('');
                setPassword('');
              }} 
              className="font-bold text-white hover:text-accent-teal transition-colors focus:outline-none"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
