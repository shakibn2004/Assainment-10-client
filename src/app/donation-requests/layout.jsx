import Footer from '@/Components/Homepage/Footer';
import Navbar from '@/Components/Homepage/Navbar';
import React from 'react';

const DanationLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default DanationLayout;