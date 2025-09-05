// Importing all necessary attributes
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

//fetching products and displaying using bootstrap formatting along with edit show and delete button functions with navigation to product details
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (bl) => setShow(bl);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/products');
            setProducts(response.data);   
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`);
                fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container>
            <div className="display-flex product-list">
                <h3>Products</h3>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            (ID: {product.id}) <br /> Name: {product.name} <br /> Price: {product.price} <br /><br /> 
                            <button onClick={() => navigate(`/edit-product/${product.name}`)}>Edit</button>
                            <button onClick={() => navigate(`/product/${product.name}`)}>Show</button>
                            <button onClick={() => { deleteProduct(product.id); {handleShow(true)};}}>Delete</button>

{/* Creating Modal for deleting */}
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Alert!</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Product Deleted</Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>        
    );
};

export default ProductList