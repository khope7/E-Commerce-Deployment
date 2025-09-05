/*
Customer and CustomerAccount Management:
Create React components and functionality for managing Customers and their associated CustomerAccounts:
Create Customer Form: Develop a form component to capture and submit essential customer information, including name, email, and phone number.
Make sure this matches what you did back in Module 6!!

Read Customer Details:
Create a component to display customer details retrieved from the backend based on their unique identifier (ID).
Update Customer Form: Build a form component that allows users to update customer details, including the name, email, and phone number.
Delete Customer Information: Build a function in your Customer Detail Component that when triggered will delete a customer from the backend based on their unique identifier (ID).

Product Catalog:
Create React components and functionality for managing Products:

List Products:
Create a component to display a list of all available products in the e-commerce platform, providing essential product information.

Create Product Form:
Develop a form component for adding a new product to the e-commerce database. Capture essential product details, such as the product name and price.

Read Product Details:
Create a component to display product details retrieved from the backend based on the product's unique identifier (ID).

Update Product Form:
Build a form component that allows users to update product details, including the product name and price.

Delete Product Information:
Build a function in your Product Detail Component that when triggered will delete a product from the backend based on their unique identifier (ID).

Product Confirmation Module:
Design a confirmation modal or component for securely creating, updating or deleting a product from the system based on its unique ID
View and Manage Product Stock Levels (Bonus): Develop a component for viewing and managing the stock levels of each product in the catalog. Administrators should be able to see the current stock level and make adjustments as needed.
Restock Products When Low (Bonus): Implement a component that monitors product stock levels and triggers restocking when they fall below a specified threshold. Ensure that stock replenishment is efficient and timely.

Order Processing:
Develop React components and functionality for efficient handling of customer orders:

Place Order Form:
Create a form component for customers to place new orders, specifying the products they wish to purchase and providing essential order details. Each order should capture the order date and the associated customer.
Component Creation and Organization:
Create either functional or class components to build the user interface of the e-commerce application.
Organize components into a logical folder structure for better code organization and maintainability.
Use React hooks such as useState, useEffect, and useContext as appropriate to manage component state and side effects.

Routing and Navigation:
Implement routing using React Router to create routes for different sections and pages of the application.
Define route paths and components to be rendered when specific URLs are accessed.
Use navigation links or buttons to allow users to navigate between different parts of the application.

Forms and Form Handling:
Develop forms using React components to capture user inputs for creating, updating, or interacting with customer data, product data, and orders.
Implement form validation to ensure that user inputs meet specified criteria, such as required fields, proper formatting, and validation messages.
Utilize React state and hooks to manage form data and user input changes.
Implement form submission handlers to send data to the backend API for processing.

Event Handling:
Set up event handlers to respond to user interactions and events within the application.
Implement event listeners for actions like button clicks, form submissions, and user interactions with UI elements.
Use event handling to trigger actions like submitting forms, deleting records, and updating data.
Integration with React-Bootstrap:
Incorporate React-Bootstrap components and utilities to enhance the user interface of the application.
Use React-Bootstrap components such as buttons, forms, modals, alerts, and navigation elements to improve the visual design and functionality.
Apply Bootstrap styles and CSS classes to achieve a visually appealing and responsive layout

Error Handling:
Implement error handling mechanisms to gracefully handle errors that may occur during data retrieval, form submission, or API interactions.
Display informative error messages to users when errors occur, helping them understand the nature of the issue and how to resolve it.
Use try-catch blocks or error-handling functions to capture and manage exceptions and errors.
*/


// Importing all necessary attributes
import { Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import CustomerList from "./components/CustomerList";
import CustomerAccountList from './components/CustomerAccounts';
import CustomerForm from './components/CustomerForm';
import OrderList from "./components/OrderList";
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import ShowCustomer from './components/ShowCustomer';
import ShowProduct from './components/ShowProduct';
import OrderForm from './components/OrderForm';
import './AppStyles.css';
import 'bootstrap/dist/css/bootstrap.css';



// Incorporating all components for Navigation Routing
function App() {
  return (
    <div className="app-container">
      <NavigationBar />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/add-customer/' element={<CustomerForm/>} />
        <Route path='/edit-customer/:id' element={<CustomerForm/>} />
        <Route path='/customers' element={<CustomerList/>} />
        <Route path='/customer-accounts' element={<CustomerAccountList/>} />
        <Route path='/customer/:id' element={<ShowCustomer/>} />
        <Route path='/add-product' element={<ProductForm/>} />
        <Route path='/edit-product/:named' element={<ProductForm/>} />
        <Route path='/products' element={<ProductList/>} />
        <Route path='/product/:named' element={<ShowProduct/>} />
        <Route path='/add-order' element={<OrderForm/>} />
        <Route path='/orders' element={<OrderList/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;