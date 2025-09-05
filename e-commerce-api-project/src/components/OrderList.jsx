// Importing all necessary attributes
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

//fetching orders and displaying using bootstrap formatting
const OrderList = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/orders');
            setOrders(response.data);   
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <Container>
            <div className="display-flex order-list">
                <h3>Orders</h3>
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            (Customer ID: {order.customer_id}) <br />
                            (Order ID: {order.id}) <br />
                            Date Ordered: {order.date} <br />
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    );
};

export default OrderList