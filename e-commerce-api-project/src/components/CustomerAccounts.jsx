// Importing all necessary attributes
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

//fetching customer accounts and displaying using bootstrap formatting
const CustomerAccountList = () => {
    const [customerAccounts, setCustomerAccounts] = useState([]);

    const fetchCustomerAccounts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/customer_accounts');
            setCustomerAccounts(response.data);   
        } catch (error) {
            console.error('Error fetching customer accounts:', error);
        }
    };

    useEffect(() => {
        fetchCustomerAccounts();
    }, []);

    // console.log(JSON.stringify(customerAccounts))

    return (
        <Container>
            <div className="display-flex customerAccount-list">
                <h3>Customer Accounts</h3>
                <ul>
                    {customerAccounts.map(customerAccount => (
                        <li key={customerAccount.id}>
                            (Account ID: {customerAccount.id}) <br />
                            (Customer ID: {customerAccount.customer_id}) <br />
                            Username: <p>{customerAccount.username}</p>
                            Password: <p>******</p>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    );
};

export default CustomerAccountList