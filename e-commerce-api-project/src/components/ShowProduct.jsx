// Importing all necessary attributes
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

// Creating component for showing specific product
const ShowProduct = () => {
    const [product, setProduct] = useState([]);
    const { named } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let productArray = []
        if (named) {
            const fetchProductDetails = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/products/by-name?name=${named}`);
                    productArray.push(response.data)
                    setProduct(productArray);
                } catch (error) {
                    console.error('Error fetching product details:', error);
                }
            };
            fetchProductDetails();
        }
    }, [named]);

    return (
        <div className="product-detail">
            <h3>Product Detail</h3>
            <ul>
            {product.map(product => (
                    <li key={product.id} onClick={() => console.log(`Product ID: ${product.id}
                                                                        Product Name: ${product.name}
                                                                        Product Price: $${product.price} `)}>
                        ID: {product.id} <br />
                        Name: {product.name} <br />
                        Price: {product.price} <br />
                        <button onClick={() => navigate(`/`)}>Back to Home</button>
                    </li>
            ))}
            </ul>
        </div>
    );
};

export default ShowProduct;