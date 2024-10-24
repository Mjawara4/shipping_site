import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ShipForm from './pages/ShipForm';
import EnquiryForm from './pages/EnquiryForm';
import './components/styles/global.css';

const App = () => {
    return (
        <Router>
            <div style={{ minHeight: '100vh' }}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ship" element={<ShipForm />} />
                    <Route path="/enquire" element={<EnquiryForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;