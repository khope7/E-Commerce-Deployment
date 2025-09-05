// Importing all necessary attributes
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

// Creating component for showing specific customer
const ShowCustomer = () => {
    const [customer, setCustomer] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let customerArray = []
        if (id) {
            const fetchCustomerDetails = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/customers/by-id?id=${id}`);
                    customerArray.push(response.data)
                    setCustomer(customerArray);
                } catch (error) {
                    console.error('Error fetching customer details:', error);
                }
            };
            fetchCustomerDetails();
        }
    }, [id]);

    return (
        <div className="customer-detail">
            <h3>Customer Detail</h3>
            <ul>
            {customer.map(customer => (
                    <li key={customer.id} onClick={() => console.log(`Customer ID: ${customer.id}
                                                                    Customer Name: ${customer.name}
                                                                    Customer Email: ${customer.email}
                                                                    Customer Phone: ${customer.phone} `)}>
                        ID: {customer.id} <br />
                        Name: {customer.name} <br />
                        Email: {customer.email} <br />
                        Phone: {customer.phone} <br /> <br />
                        <button onClick={() => navigate(`/`)}>Back to Home</button>
                    </li>
            ))}
            </ul>
        </div>
    );
};

export default ShowCustomer;