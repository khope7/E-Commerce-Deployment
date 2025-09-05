// Importing all necessary attributes
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

// Creating form to add additional order with required fields
const OrderForm = () => {
    const [customer_id, setCustomerId] = useState();
    const [date, setDate] = useState('');
    const [products, setProductIds] = useState();
    const [errors, setErrors] = useState({});    
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState('')
    const navigate = useNavigate();

// catching validation and error check
        const validateForm = () => {
            const errors = {};
            if (!customer_id) errors.customer_id = 'Customer ID is required';
            if (!date) errors.date = 'Date is required';
            if (!products) errors.products = 'Products required';
            return errors;
        };

        const handleSubmit = async (event) => {
            event.preventDefault();
            const errors = validateForm();
            if (Object.keys(errors).length === 0) {
                setSubmitting(true);
                setError(null);
                const customerData = { customer_id, date, products };
                try {
                    await axios.post('http://127.0.0.1:5000/orders', customerData);
                    setCustomerId(1);
                    setDate('');
                    setProductIds([]);
                    setSubmitting(false);
                    navigate('/orders');
                } catch (error) {
                    console.error('Error submitting the customer:', error);
                    setError(error.toString());
                    setSubmitting(false);
                }
            } else {
                setErrors(errors);
            }
        };
    
        if (isSubmitting) return <p>Submitting customer data...</p>;
        if (error) return <p>Error submitting customer data: {error}</p>;

    return (
        <form onSubmit={handleSubmit}>
        <h3>Add Order </h3>
        <label>
            Customer ID:
            <input type="number" value={customer_id} onChange={(e) => setCustomerId(e.target.value)} />
            {errors.customer_id && <div style={{ color: 'red' }}>{errors.customer_id}</div>}
        </label>
        <br />
        <label>
            Date:
            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
            {errors.date && <div style={{ color: 'red' }}>{errors.date}</div>}
        </label>
        <br />
        <label>
            Products:
            {/* Unable to parse products field*/}
            <input type="number" value={products} onChange={(e) => setProductIds(`[{"id": ${e.target.value}]`)} />
            {errors.products && <div style={{ color: 'red' }}>{errors.products}</div>}
        </label>
        <br />
        <button type="submit">Submit</button>
        </form>
    );
};

export default OrderForm;