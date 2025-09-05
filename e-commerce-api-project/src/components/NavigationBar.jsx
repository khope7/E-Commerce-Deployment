// Importing all necessary attributes
import { Link, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


// Incorporating all components allowed for customer to access directly through navigation bar
function NavigationBar() {
    return (
        <nav className="clearfix">
            <Link to="/" activeclassname="active">Home</Link>
            <NavLink to="/add-customer" activeclassname="active">Add Customer</NavLink>
            <NavLink to="/customers" activeclassname="active">Customers</NavLink>
            <NavLink to="/customer-accounts" activeclassname="active">Customer Accounts</NavLink>
            <NavLink to="/customer" activeclassname="active">Customer Detail</NavLink>
            <NavLink to="/add-product" activeclassname="active">Add Product</NavLink>
            <NavLink to="/products" activeclassname="active">Products</NavLink>
            <NavLink to="/product" activeclassname="active">Product Detail</NavLink>
            <NavLink to="/add-order" activeclassname="active">Add Order</NavLink>
            <NavLink to="/orders" activeclassname="active">Orders</NavLink>
        </nav>
    );
}

export default NavigationBar