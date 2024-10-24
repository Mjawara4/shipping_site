import React, { useState } from 'react';
import '../components/styles/components_1.css';

const ShipForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        fromLocation: '',
        toLocation: '',
        weight: '',
        packageType: ''
    });
    const [price, setPrice] = useState(null);
    const [customers, setCustomers] = useState([]);

    const calculatePrice = () => {
        const type = formData.packageType.toLowerCase();
        if (type === 'laptop') return 50;
        if (type === 'Iphone') return 30;
        if (type === 'Android') return 20;
        return formData.weight * 12;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const estimatedPrice = calculatePrice();
        setPrice(estimatedPrice);
        setCustomers([...customers, { name: formData.name, phone: formData.phone }]);
    };

    return (
        <div className="container">
            <h2 className="page-title">Ship Your Package</h2>
            
            <div className="alert alert-info">
                <p>To arrange shipping, please call: <strong>1-800-SHIP-NOW</strong></p>
                <p>Drop-off location: <strong>123 Shipping Street</strong></p>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
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
                    <label>From Location:</label>
                    <input
                        type="text"
                        required
                        value={formData.fromLocation}
                        onChange={(e) => setFormData({...formData, fromLocation: e.target.value})}
                    />
                </div>

                <div className="form-group">
                    <label  style={{ display: 'flex', alignItems: 'center' }}>
                        To Location:
                        <select
                            required
                            value={formData.toLocation}
                            onChange={(e) => setFormData({...formData, toLocation: e.target.value})}
                        >
                            <option value="">Select</option>
                            <option value="</select> 123 Shipping Street">The Gambia</option>
                            <option value="</select> 456 Shipping Street">Others</option>
                            
                        </select>
                    </label>
                </div>

                <div className="form-group">
                    <label>Weight (kg):</label>
                    <input
                        type="number"
                        required
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    />
                </div>

                <div className="form-group">
                    <label>Package Type:</label>
                    <select
                        required
                        value={formData.packageType}
                        onChange={(e) => setFormData({...formData, packageType: e.target.value})}
                    >
                        <option value="">Select</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Phone">Phone</option>
                        <option value="Other">Other</option>
                    </select>
                </div>


                {/* ... other form fields ... */}
                <button type="submit" className="button">Calculate Price</button>
            </form>

            {price !== null && (
                <div className="alert alert-success" style={{ marginTop: '1.5rem' }}>
                    <h3 className="section-title">Estimated Price: ${price}</h3>
                </div>
            )}

            <div style={{ marginTop: '2rem' }}>
                <h3 className="section-title">Customer Information</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Package Type</th>
                            <th>Price</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={index}>
                                <td>{customer.name}</td>
                                <td>{customer.phone}</td>
                                <td style={{ textAlign: 'center' }}>{formData.packageType}</td>
                                <td>${price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShipForm;