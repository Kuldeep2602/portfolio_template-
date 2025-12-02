import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16"> {/* pt-16 to account for fixed navbar */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
