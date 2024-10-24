import React from 'react';
import { Link } from 'react-router-dom';
import '../components/styles/components.css';

const Navbar = () => (
    <nav className="nav">
        <div className="nav-content">
            <Link to="/" className="nav-brand">ShipCo</Link>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/ship">Ship</Link>
                <Link to="/enquire">Enquire</Link>
            </div>
        </div>
    </nav>
);

export default Navbar;