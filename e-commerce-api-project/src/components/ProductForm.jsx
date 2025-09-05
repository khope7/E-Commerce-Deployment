// Importing all necessary attributes
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';


// Creating submission form and edit functionality for individual product pull and update along with fetch from edit nav
const ProductForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [id, setId] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState('')
    const { named } = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async (bl) => setShow(bl);

    useEffect(() => {
        if (named) {
            const fetchProductDetails = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/products/by-name?name=${named}`);
                    setName(response.data.name);
                    setPrice(response.data.price);
                    setId(response.data.id)
                } catch (error) {
                    console.error('Error fetching product details:', error);
                    setError(error.toString());
                }
            };
            fetchProductDetails();
        }
    }, [named]);

// catching for errors and validation
    const validateForm = () => {
        const errors = {};
        if (!name) errors.name = 'Product name is required';
        if (!price || price <= 0) errors.price = 'Price must be a positive number';
        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            setSubmitting(true);
            setError(null);
            const productData = { name, price };
            try {
                if (named) {
                    await axios.put(`http://127.0.0.1:5000/products/${id}`, productData);
                } else {
                    await axios.post('http://127.0.0.1:5000/products', productData);
                }
                setName('');
                setPrice('');
                setSubmitting(false);
                navigate('/products');
            } catch (error) {
                console.error('Error submitting the product:', error);
                setError(error.toString());
                setSubmitting(false);
            }
        } else {
            setErrors(errors);
        }
    };

    if (isSubmitting) return <p>Submitting product data...</p>;
    if (error) return <p>Error submitting product data: {error}</p>;

    return (
        <form onSubmit={handleSubmit}>
        <h3>{named ? 'Edit' : 'Add'} Product </h3>
        <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </label>
        <br />
        <label>
            Price:
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            {errors.price && <div style={{ color: 'red' }}>{errors.price}</div>}
        </label>
        <br />
        <button>Submit</button>
        </form>
    );
};

export default ProductForm;