import React from 'react';
import { FaShippingFast, FaShieldAlt, FaStar } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      {/* Hero Section */}
      <div className="hero-section bg-light p-5 rounded shadow-sm">
        <h1 className="display-4 fw-bold text-dark">Welcome to MyShop</h1>
        <p className="lead text-secondary">Find the best products at unbeatable prices.</p>
        <a href="/products" className="btn btn-primary btn-lg mt-3 px-4 fw-semibold">🛍️ Shop Now</a>
      </div>

      {/* Features Section */}
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="feature-card">
            <FaShippingFast size={40} className="feature-icon" />
            <h5>Fast Delivery</h5>
            <p className="text-muted">We ensure quick and safe delivery.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-card">
            <FaStar size={40} className="feature-icon" />
            <h5>Best Quality</h5>
            <p className="text-muted">Top-rated products from trusted brands.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-card">
            <FaShieldAlt size={40} className="feature-icon" />
            <h5>Secure Payment</h5>
            <p className="text-muted">Your transactions are safe with us.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
