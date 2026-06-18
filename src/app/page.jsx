import Footer from '@/Components/Homepage/Footer';
import Hero from '@/Components/Homepage/Hero';
import HowItWorks from '@/Components/Homepage/HowItWorks';
import Navbar from '@/Components/Homepage/Navbar';
import TestimonialsSection from '@/Components/Homepage/TestimonialsSection';
import UrgentNeeds from '@/Components/Homepage/UrgentNeeds';
import React from 'react';


const Main = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <UrgentNeeds />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Main;