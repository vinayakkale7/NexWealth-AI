import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, PieChart, Target, FileText, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    title: "Welcome to NexWealth AI",
    description: "Your family's intelligent financial operating system. Let's get you set up in less than 2 minutes.",
    icon: Sparkles,
    color: "text-accent-purple",
    bg: "bg-accent-purple/20"
  },
  {
    title: "Add Your First Holding",
    description: "Connect your brokerages, add mutual funds, or track real estate to give the AI a complete picture.",
    icon: PieChart,
    color: "text-accent-teal",
    bg: "bg-accent-teal/20"
  },
  {
    title: "Create Financial Goals",
    description: "Set targets for retirement, education, or major purchases and let the AI build the roadmap.",
    icon: Target,
    color: "text-accent-emerald",
    bg: "bg-accent-emerald/20"
  },
  {
    title: "Meet Your AI Advisor",
    description: "Get real-time insights, tax-loss harvesting opportunities, and portfolio rebalancing suggestions.",
    icon: Sparkles,
    color: "text-accent-blue",
    bg: "bg-accent-blue/20"
  },
  {
    title: "Generate Smart Reports",
    description: "Instantly create PDF reports for your family members, CPA, or financial planners with a single click.",
    icon: FileText,
    color: "text-text-primary",
    bg: "bg-white/10"
  }
];

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('nexwealth_onboarding_complete');
    if (!hasSeenOnboarding) {
      // Small delay for dramatic effect
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('nexwealth_onboarding_complete', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const StepInfo = STEPS[currentStep];
  const Icon = StepInfo.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="absolute inset-0 bg-background/90 backdrop-blur-md" 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg glass-panel rounded-3xl p-8 border border-white/10 shadow-premium bg-card/90 overflow-hidden"
        >
          {/* Progress bar at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
            <motion.div 
              className="h-full bg-gradient-to-r from-accent-purple to-accent-teal"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex justify-between items-center mb-8 mt-2">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <button 
              onClick={handleComplete}
              className="text-xs font-bold text-text-muted hover:text-white transition-colors"
            >
              Skip Intro
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-glow ${StepInfo.bg}`}>
                <Icon size={32} className={StepInfo.color} />
              </div>
              
              <h2 className="text-2xl font-bold text-white tracking-tight mb-3">
                {StepInfo.title}
              </h2>
              
              <p className="text-text-secondary leading-relaxed mb-8 max-w-sm">
                {StepInfo.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center w-full mt-4 gap-4">
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'bg-white w-4' : i < currentStep ? 'bg-white/40' : 'bg-white/10'}`} 
                />
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all shadow-glow flex items-center gap-2 group"
            >
              {currentStep === STEPS.length - 1 ? 'Get Started' : 'Next'}
              {currentStep === STEPS.length - 1 ? (
                <CheckCircle2 size={16} className="group-hover:scale-110 transition-transform" />
              ) : (
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
