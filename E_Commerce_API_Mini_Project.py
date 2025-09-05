#Import methods for SQLAlchemy to Postman Mini Project
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import fields
from marshmallow import ValidationError

#Connecting to SQL Library
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:CodingTemple.1@localhost/e_commerce_db'
db = SQLAlchemy(app)
ma = Marshmallow(app)

#Customer Schema
class CustomerSchema(ma.Schema):
    name = fields.String(required=True)
    email = fields.String(required=True)
    phone = fields.String(required=True)

    class Meta:
        fields = ("name", "email", "phone", "id")    


customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)

#CustomerAccount Schema
class CustomerAccountSchema(ma.Schema):
    customer_id = fields.Integer(required=True)
    username = fields.String(required=True)
    password = fields.String(required=True)

    class Meta:
        fields = ("customer_id", "username", "password", "id")

customer_account_schema = CustomerAccountSchema()
customer_accounts_schema = CustomerAccountSchema(many=True)

#Product Schema
class ProductSchema(ma.Schema):
    name = fields.String(required=True)
    price = fields.Float(required=True)

    class Meta:
        fields = ("name", "price", "id")    


product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

class ProductOrderSchema(ma.Schema):
    id = fields.Integer(required=True)

    class Meta:
        fields = ("id","name","price")

#Orders Schema
class OrderSchema(ma.Schema):
    customer_id = fields.Integer(required=True)
    date = fields.String(required=True)
    products = fields.List(fields.Nested(ProductOrderSchema))
    

    class Meta:
        fields = ("customer_id", "date", "id", "products")    

order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)

#Creating class Models for Customers, Customer Accounts, Products, and Orders
class Customer(db.Model):
    __tablename__ = 'customers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(320))
    phone = db.Column(db.String(15))
    orders = db.relationship('Order', backref='customer')

#One to one
class CustomerAccount(db.Model):
    __tablename__ = 'customer_accounts'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    customer = db.relationship('Customer', backref='customer_account', uselist=False)

#One to many
order_product = db.Table('order_product',
        db.Column('order_id', db.Integer, db.ForeignKey('orders.id'), primary_key=True),
        db.Column('product_id', db.Integer, db.ForeignKey('products.id'), primary_key=True)
)

class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    orders = db.relationship('Order', secondary=order_product, backref=db.backref('products'))

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))

#Creating Welcome method
@app.route('/')
def home():
    return 'Welcome to the e-commerce API.'

#Creating CRUD routes for Postman
#----------CUSTOMERS----------------------------------------------------------------------------------------------------------------
@app.route('/customers', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    return customers_schema.jsonify(customers)

@app.route('/customers/by-id', methods = ['GET'])
def query_customer_by_id():
    id = request.args.get('id')
    customer = Customer.query.filter_by(id=id).first()
    if customer:
        return customer_schema.jsonify(customer)
    else:
        return jsonify({"message" : "Customer not found."})

@app.route('/customers', methods=['POST'])
def add_customer():
    try:
        customer_data = customer_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    new_customer = Customer(name=customer_data['name'], email=customer_data['email'], phone=customer_data['phone'])
    db.session.add(new_customer)
    db.session.commit()
    return jsonify({"message": "New customer added succesfully"}), 201

@app.route('/customers/<int:id>', methods=['PUT'])
def update_customer(id):
    customer = Customer.query.get_or_404(id)
    try:
        customer_data = customer_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages),400
    
    customer.name = customer_data['name']
    customer.email = customer_data['email']
    customer.phone = customer_data['phone']
    db.session.commit()
    return jsonify({"message": "Customer details updated successfully"}), 200

@app.route('/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    customer = Customer.query.get_or_404(id)
    db.session.delete(customer)
    db.session.commit()
    return jsonify({"message": "Customer removed successfully"}), 200

#---------CUSTOMER ACCOUNTS--------------------------------------------------------------------------------------------------------
@app.route('/customer_accounts', methods=['GET'])
def get_customer_accounts():
    customers = CustomerAccount.query.all()
    return customer_accounts_schema.jsonify(customers)

@app.route('/customer_accounts/by-id', methods = ['GET'])
def query_customer_account_by_id():
    id = request.args.get('id')
    customer_account = CustomerAccount.query.filter_by(id=id).first()
    if customer_account:
        return customer_account_schema.jsonify(customer_account)
    else:
        return jsonify({"message" : "Customer account not found."})

@app.route('/customer_accounts', methods=['POST'])
def add_customer_account():
    try:
# Validate and deserialize input
        customer_account_data = customer_account_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    new_customer_account = CustomerAccount(customer_id=customer_account_data['customer_id'], username=customer_account_data['username'], password=customer_account_data['password'])
    db.session.add(new_customer_account)
    db.session.commit()
    return jsonify({"message": "New customer account added succesfully"}), 201

@app.route('/customer_accounts/<int:customer_id>', methods=['PUT'])
def update_customer_account(customer_id):
    customer_account = CustomerAccount.query.get_or_404(customer_id)
    try:
        customer_account_data = customer_account_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages),400
    
    customer_account.customer_id = customer_account_data['customer_id']
    customer_account.username = customer_account_data['username']
    customer_account.password = customer_account_data['password']
    db.session.commit()
    return jsonify({"message": "Customer details updated successfully"}), 200

@app.route('/customer_accounts/<int:id>', methods=['DELETE'])
def delete_customer_account(id):
    customer_account = CustomerAccount.query.get_or_404(id)
    db.session.delete(customer_account)
    db.session.commit()
    return jsonify({"message": "Customer account removed successfully"}), 200

#--------PRODUCTS-----------------------------------------------------------------------------------------------------------------
@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return products_schema.jsonify(products)

@app.route('/products/by-name', methods = ['GET'])
def query_products_by_name():
    name = request.args.get('name')
    product = Product.query.filter_by(name=name).first()
    if product:
        return product_schema.jsonify(product)
    else:
        return jsonify({"message" : "Product not found."})

@app.route("/products", methods=["POST"])
def add_product():
    try:
        product_data = product_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    new_product = Product(name=product_data["name"], price=product_data["price"])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"MESSAGE": "New product added successfully."}), 201

@app.route('/products/<string:name>', methods=['PUT'])
def update_product(name):
    product = Product.query.get_or_404(name)
    try:
        product_data = product_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages),400
    
    product.name = product_data['name']
    product.price = product_data['price']
    db.session.commit()
    return jsonify({"message": "Product details updated successfully"}), 200

@app.route('/products/<int:name>', methods=['DELETE'])
def delete_product(name):
    product = Product.query.get_or_404(name)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product removed successfully"}), 200

#-------ORDERS------------------------------------------------------------------------------------------------------------------
@app.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return orders_schema.jsonify(orders)

@app.route('/orders/by-id', methods = ['GET'])
def query_orders_by_id():
    id = request.args.get('id')
    order = Order.query.filter_by(id=id).first()
    if order:
        return order_schema.jsonify(order)
    else:
        return jsonify({"message" : "Order not found."})
    
@app.route('/orders/by-customer_id', methods = ['GET'])
def query_orders_by_customer_id():
    customer_id = request.args.get('customer_id')
    order = Order.query.filter_by(customer_id=customer_id)
    if order:
        return orders_schema.jsonify(order)
    else:
        return jsonify({"message" : "Orders not found."})

@app.route("/orders",methods=["POST"])
def create_order():
  try:
    order_data = order_schema.load(request.json)
  except ValidationError as err:
    return jsonify(err.messages),400
  
  new_order = Order(customer_id = order_data["customer_id"], date = order_data["date"])
  for product_id in order_data["products"]:
    product = Product.query.get_or_404(product_id["id"])
    new_order.products.append(product)

  db.session.add(new_order)
  db.session.commit()
  return jsonify({"message": "New Order Added Successfully!"}), 201


@app.route('/orders/<int:id>', methods=['PUT'])
def update_order(id):
    order = Order.query.get_or_404(id)
    try:
        order_data = order_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages),400
    
    order.customer_id = order_data['customer_id']
    order.date = order_data['date']
    db.session.commit()
    return jsonify({"message": "Order details updated successfully"}), 200

@app.route('/orders/<int:id>', methods=['DELETE'])
def delete_order(id):
    order = Order.query.get_or_404(id)
    db.session.delete(order)
    db.session.commit()
    return jsonify({"message": "Order removed successfully"}), 200
#-----------------------------------------------------------------------------------------------------------------------

#Initialize the database and creating tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug = True)