## E-Commerce-API
Hello! Here is the Mini Project for the E_Commerce_API Mini Project.

# Imports
MySQL, Flask, Flask-Marshmallow, and Flask-Alchemy have been imported and integrated into the API system for built in functions and methods

# Schemas
The program consists of 5 Schemas for user interaction: Customers, Customer Accounts, Products, Orders, and Product Order Schemas have been added, with Product Order Schema being used to capture the many to many relationship between orders and products, allowing orders to contain multiple products, and for the same products to be listed within multiple orders.

# Models
Class models have been created for each of the schemas for the table creation. Each class has been create with appropiate listed attributes.

# CRUD Methods (Create, Read, Update, Delete)
GET, POST, PUT, and DELETE methods have been created for each of the Schemas represented for user interaction. The Orders CRUD has unique GET methods that allow the user to search and find either one order for DATE retrieval, all orders made by a particular customer with DATE retrieval, or all orders with all details listed

# Postman
The E_Commerce_API Methods have been created and attached via a Json file to this project and includes working CRUD methods for all user interactions.
