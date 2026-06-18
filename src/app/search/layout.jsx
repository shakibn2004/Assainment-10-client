import Footer from '@/Components/Homepage/Footer';
import Navbar from '@/Components/Homepage/Navbar';
import React from 'react';

const SearchLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default SearchLayout;