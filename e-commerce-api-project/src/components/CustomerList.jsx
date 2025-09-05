// Importing all necessary attributes
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

//fetching customers and displaying using bootstrap formatting along with edit show and delete button functions with navigation to customer details
const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/customers');
            setCustomers(response.data);   
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const deleteCustomer = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
                fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <Container>
            <div className="display-flex customer-list">
                <h3>Customers</h3>
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id}>
                            (ID: {customer.id}) <br /> Name: <br /> {customer.name} <br /><br /> 
                            <button onClick={() => navigate(`/edit-customer/${customer.id}`)}>Edit</button>
                            <button onClick={() => navigate(`/customer/${customer.id}`)}>Show</button>
                            <button onClick={() => deleteCustomer(customer.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    );
};

export default CustomerList