import React, { useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import Pricing from './pages/Pricing';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contacts from './pages/Contacts';
import Campaigns from './pages/Campaigns';
import Analytics from './pages/Analytics';
import { AppContext } from './context/AppContext'; 
import GeneratePage from './pages/GeneratePage';
import ScheduledEmails from './pages/ScheduledEmails';
import EmailVerify from './pages/EmailVerify';

const App = () => {
  const { token, setToken } = useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      // Optionally, fetch user details from the backend
    }
  }, [setToken]);

  return (
    <div>
      <ToastContainer />
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/email-verify" element={<EmailVerify />}/>

        {/* Private Routes */}
        {token && (
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="contacts" element={<Contacts />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="generate" element={<GeneratePage />} />
            <Route path="scheduled-emails" element={<ScheduledEmails />} />
          </Route>
        )}

        {/* Restricted Access */}
        <Route path="/my-profile" element={token ? <MyProfile /> : <Navigate to="/login" replace />} />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
