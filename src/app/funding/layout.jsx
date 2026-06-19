import Footer from '@/Components/Homepage/Footer';
import Navbar from '@/Components/Homepage/Navbar';

const FundingLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default FundingLayout;