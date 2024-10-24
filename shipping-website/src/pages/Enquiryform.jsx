import React, { useState } from 'react';
import '../components/styles/components_1.css';

const EnquiryForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        question: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your enquiry. We will contact you soon!');
        setFormData({ name: '', phone: '', email: '', question: '' });
    };

    return (
        <div className="container">
            <h2 className="page-title">Make an Enquiry</h2>

            <div className="alert alert-info">
                <p>To arrange shipping, please call: <strong>1-800-SHIP-NOW</strong></p>
                <p>Drop-off location: <strong>123 Shipping Street</strong></p>
            </div>
            
            <div className="grid">
                <div className="card">
                    <h3 className="section-title">FAQ</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <h4 style={{ fontWeight: 'bold' }}>What areas do you service?</h4>
                            <p>We provide shipping services nationwide.</p>
                        </div>
                        {/* ... other FAQ items ... */}
                    </div>
                </div>

                <div className="card">
                    <h3 className="section-title">Contact Us</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>PHONE:</label>
                            <input
                                type="phone"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>

                        <div className="form-group">
                            <label>Question:</label>
                            <textarea
                                required
                                value={formData.question}
                                onChange={(e) => setFormData({...formData, question: e.target.value})}
                            />
                        </div>
                        {/* ... other form fields ... */}
                        <button type="submit" className="button">Submit Enquiry</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EnquiryForm;