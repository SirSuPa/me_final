import React from 'react';
import { HiTruck, HiBadgeCheck, HiCreditCard } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      {/* Hero Section */}
      <motion.div 
        className="hero-section bg-primary text-white p-5 rounded shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="display-4 fw-bold">final shop</h1>
        <p className="lead">welcome to my shop</p>
        <a href="/products" className="btn btn-light btn-lg mt-3 px-4 fw-semibold shadow">
          Get start
        </a>
      </motion.div>

      {/* Features Section */}
      <div className="row mt-5">
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className="col-md-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="feature-card p-4 rounded shadow-sm bg-light h-100">
              <feature.icon size={50} className="feature-icon text-primary mb-3" />
              <h5 className="fw-bold">{feature.title}</h5>
              <p className="text-muted">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const features = [
  {
    icon: HiTruck,
    title: 'Fast Delivery',
    description: 'We ensure quick and safe delivery.',
  },
  {
    icon: HiBadgeCheck,
    title: 'Best Quality',
    description: 'Top-rated products from trusted brands.',
  },
  {
    icon: HiCreditCard,
    title: 'Secure Payment',
    description: 'Your transactions are safe with us.',
  },
];

export default Home;
