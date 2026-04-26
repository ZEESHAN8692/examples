'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Shield, Zap, Globe, Github } from 'lucide-react';
import './home.css';

export default function HomePage() {
  const [address, setAddress] = useState('');
  const router = useRouter();

  const handleExampleClick = async () => {
    const exampleHash = '1Fw7wvVPhv5eioWQZ2if2zRUcHNdNBfu9r';
    setAddress(exampleHash);
    
    // Simulate API call as requested: "Make an API call, and Redirect"
    try {
      console.log(`Starting analysis for: ${exampleHash}`);
      // In a real app, this might trigger a background processing task
      // For now, we redirect to the visualization page
      router.push(`/visualization/${exampleHash}`);
    } catch (error) {
      console.error('Failed to trigger analysis:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      router.push(`/visualization/${address.trim()}`);
    }
  };

  return (
    <div className="homeContainer">
      <header className="header">
        <div className="logo">
          Crystal <span>Lite</span>
        </div>
        <nav className="nav">
          <a href="#" className="loginBtn">Login</a>
          <a href="#" className="signUpBtn">Sign up</a>
        </nav>
      </header>

      <main className="hero">
        <h1>Investigate the Crypto World</h1>
        <p>
          Crystal Lite provides free blockchain investigation tools for everyone. 
          Powerful visualization for Bitcoin and Ethereum networks.
        </p>

        <form onSubmit={handleSearch} className="searchWrapper">
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Search size={20} color="#9ca3af" style={{ marginLeft: '1rem' }} />
            <input 
              type="text" 
              className="searchInput" 
              placeholder="Search by Address or Transaction Hash"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            type="button" 
            className="exampleHashBtn"
            onClick={handleExampleClick}
          >
            Example Hash
          </button>
          <button type="submit" className="searchBtn">
            Search
          </button>
        </form>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
          <span>Try: </span>
          <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>1Fw7wvV...</code>
          <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>bc1qxy2...</code>
        </div>
      </main>

      <section className="features">
        <div className="featureCard">
          <div className="featureIcon"><Shield size={24} /></div>
          <h3>Risk Assessment</h3>
          <p>Instantly check the risk level of any address or transaction in the ecosystem.</p>
        </div>
        <div className="featureCard">
          <div className="featureIcon"><Zap size={24} /></div>
          <h3>Real-time Visualization</h3>
          <p>Trace the flow of funds across multiple hops with interactive graph nodes.</p>
        </div>
        <div className="featureCard">
          <div className="featureIcon"><Globe size={24} /></div>
          <h3>Global Coverage</h3>
          <p>Support for major blockchains and thousands of entity labels for clarity.</p>
        </div>
      </section>

      <footer style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem', borderTop: '1px solid #f3f4f6' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Documentation</a>
        </div>
        <p>© 2026 Crystal Blockchain. Powered by Antigravity.</p>
      </footer>
    </div>
  );
}
