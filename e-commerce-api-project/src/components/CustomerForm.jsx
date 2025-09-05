// Importing all necessary attributes
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';


// Creating submission form and edit functionality for individual customer pull and update along with fetch from edit nav
const CustomerForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState('')
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchCustomerDetails = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/customers/by-id?id=${id}`);
                    setName(response.data.name);
                    setEmail(response.data.email);
                    setPhone(response.data.phone);
                } catch (error) {
                    console.error('Error fetching customer details:', error);

                    setError(error.toString());
                }
            };
            fetchCustomerDetails();
        }
    }, [id]);

// catching for errors and validation
    const validateForm = () => {
        const errors = {};
        if (!name) errors.name = 'Customer name is required';
        if (!email) errors.email = 'Customer email is required';
        if (!phone) errors.phone = 'Customer phone is required';
        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            setSubmitting(true);
            setError(null);
            const customerData = { name, email, phone };
            try {
                if (id) {
                    await axios.put(`http://127.0.0.1:5000/customers/${id}`, customerData);
                } else {
                    await axios.post('http://127.0.0.1:5000/customers', customerData);
                }
                setName('');
                setEmail('');
                setPhone('');
                setSubmitting(false);
                navigate('/customers');
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
        <h3>{id ? 'Edit' : 'Add'} Customer </h3>
        <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </label>
        <br />
        <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </label>
        <br />
        <label>
            Phone:
            <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
        </label>
        <br />
        <button type="submit">Submit</button>
        </form>
    );
};

export default CustomerForm;