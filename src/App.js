import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './components/Pages/LandingPage';
import LocalEvents from './components/Pages/LocalEvents';
import Directory from './components/Pages/Directory';
import History from './components/Pages/History';
import ManageUsers from './components/Pages/ManageUsers';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/local-events" element={<LocalEvents />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/history" element={<History />} />
            <Route path="/manage-users" element={<ManageUsers />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
