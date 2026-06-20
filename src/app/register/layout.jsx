import Navbar from '@/Components/Homepage/Navbar';

const LoginLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default LoginLayout;