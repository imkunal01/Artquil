import React, { useState } from 'react';
import './AuthModal.css';
import { X, Mail, Lock, User, ArrowRight, CheckCircle, Sparkles, Shield, Eye, EyeOff } from 'lucide-react';
import Logo from '../Logo';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (mode !== 'forgot' && !password) {
      setErrorMessage('Please enter your password.');
      return;
    }
    if (mode === 'signup' && !fullName) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'forgot') {
        setSuccessMessage('Password reset link sent to your email!');
        setTimeout(() => {
          setSuccessMessage('');
          setMode('login');
        }, 2000);
      } else {
        const userObj = {
          name: fullName || (email.split('@')[0]),
          email: email,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          plan: 'Pro Creator'
        };
        if (onAuthSuccess) {
          onAuthSuccess(userObj);
        }
        onClose();
      }
    }, 900);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onAuthSuccess) {
        onAuthSuccess({
          name: 'Alex Rivera',
          email: 'alex.rivera@artquil.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          plan: 'Enterprise Pro'
        });
      }
      onClose();
    }, 600);
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-glass-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="auth-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Ambient Glows */}
        <div className="auth-glow-top"></div>

        {/* Modal Header */}
        <div className="auth-modal-header">
          <div className="auth-brand-badge">
            <Logo size="sm" />
          </div>

          <h3 className="auth-modal-title">
            {mode === 'login' && 'Welcome back to Artquil'}
            {mode === 'signup' && 'Create your creator account'}
            {mode === 'forgot' && 'Reset your password'}
          </h3>

          <p className="auth-modal-sub">
            {mode === 'login' && 'Log in to manage your prompt-to-video generation tasks and AWS GPU credits.'}
            {mode === 'signup' && 'Get 100 free 4K video generation credits on sign up. No credit card required.'}
            {mode === 'forgot' && 'Enter your account email to receive a recovery token.'}
          </p>
        </div>

        {/* Mode Tabs */}
        {mode !== 'forgot' && (
          <div className="auth-mode-tabs">
            <button 
              className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setErrorMessage(''); }}
            >
              Log In
            </button>
            <button 
              className={`auth-tab-btn ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => { setMode('signup'); setErrorMessage(''); }}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Social Login Options */}
        {mode !== 'forgot' && (
          <div className="auth-social-buttons">
            <button className="btn-social-oauth" onClick={handleDemoLogin}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <button className="btn-social-oauth" onClick={handleDemoLogin}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>
        )}

        {mode !== 'forgot' && (
          <div className="auth-divider">
            <span>or with email</span>
          </div>
        )}

        {/* Error / Success Notifications */}
        {errorMessage && (
          <div className="auth-alert error">
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="auth-alert success">
            <CheckCircle size={15} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Main Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="auth-field">
              <label className="auth-label">Full Name</label>
              <div className="auth-input-wrapper">
                <User size={16} className="auth-input-icon" />
                <input 
                  type="text" 
                  className="auth-input"
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={16} className="auth-input-icon" />
              <input 
                type="email" 
                className="auth-input"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="auth-field">
              <div className="auth-label-row">
                <label className="auth-label">Password</label>
                {mode === 'login' && (
                  <button 
                    type="button" 
                    className="auth-forgot-link"
                    onClick={() => { setMode('forgot'); setErrorMessage(''); }}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="auth-input-wrapper">
                <Lock size={16} className="auth-input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="auth-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className={`auth-submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="auth-spinner"></span>
            ) : (
              <>
                <span>
                  {mode === 'login' && 'Sign In'}
                  {mode === 'signup' && 'Create Account'}
                  {mode === 'forgot' && 'Send Reset Link'}
                </span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="auth-demo-shortcut">
          <button className="btn-quick-demo" onClick={handleDemoLogin}>
            <Sparkles size={14} className="demo-sparkle" />
            <span>Click for 1-Click Instant Demo Login</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="auth-modal-footer">
          {mode === 'forgot' ? (
            <p>
              Remembered your password?{' '}
              <button className="auth-inline-link" onClick={() => setMode('login')}>
                Back to Sign In
              </button>
            </p>
          ) : (
            <p>
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                className="auth-inline-link" 
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrorMessage(''); }}
              >
                {mode === 'login' ? 'Sign up free' : 'Sign in'}
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
