import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './components/Pages/LandingPage';
import LocalEvents from './components/Pages/LocalEvents';
import Directory from './components/Pages/Directory';
import History from './components/Pages/History';
function App() {
  return (
    <Router>
      <ScrollToTop /> 
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/local-events" element={<LocalEvents />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/history" element={<History />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;