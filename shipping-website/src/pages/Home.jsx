import React from 'react';
import { Link } from 'react-router-dom';
import '../components/styles/components_1.css';

const Home = () => (
    <div className="container">
        <h1 className="page-title">Welcome to ShipCo</h1>
        <div className="grid">
            <div className="card">
                <h2 className="section-title">Ship with Us</h2>
                <p style={{ marginBottom: '1rem' }}>Ready to send your package? Get started with our shipping service.</p>
                <Link to="/ship" className="button">Start Shipping</Link>
            </div>
            <div className="card">
                <h2 className="section-title">Have Questions?</h2>
                <p style={{ marginBottom: '1rem' }}>Check our FAQ or send us an enquiry.</p>
                <Link to="/enquire" className="button">Make an Enquiry</Link>
            </div>
        </div>

        <div className="alert alert-info">
                <p>To arrange shipping, please call: <strong>1-800-SHIP-NOW</strong></p>
                <p>Drop-off location: <strong>123 Shipping Street</strong></p>
            </div>
    </div>
);

export default Home;