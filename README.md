# Microservice-API-Exercise

## Getting Started:
This project will run on NodeJs using MongoDB as database.

## To install:

### Clone the repository, install node packages and verify routes locally

git clone https://github.com/shrithika22/Microservice-API-Exercise.git

cd Microservice-API-Exercise

#### For ProductMicroservice: 
cd ProductMicroservice

#### For UserCartMicroservice: 
cd UserCartMicroservice

### To Install node packages: 
npm install

npm install mongoose

npm install express –save

## To Run: 
npm start


### Two Separate Databases are used in MongoDB
1)	ProductDB database: Consists of list of all available products.

2)	CartItemDB database: Consists of list of cart items of user.

## To Verify:
#### Open your local browser or postman and verify the api:
#### For ProductMicroservice: 

GET request: 

http://localhost:3000/rest/v1/products

This returns the list of Products available in JSON format.


#### For UserCartMicroservice: 

User ids: ‘qa-test-user’ OR ‘qb-test-user’

GET request: 

http://localhost:3000/rest/v1/users/qa-test-user/cart 
 			OR
 http://localhost:3000/rest/v1/users/qb-test-user/cart
 
This returns list of available products in the cart for a given user in JSON format.


PUT request:

Verify this in POSTMAN with Body Parameters in urlencoded form 

Example: Body Parameters {producId:  12445dsd234, quantity: 2}

http://localhost:3000/rest/v1/users/qa-test-user/cart 
OR 
http://localhost:3000/rest/v1/users/qb-test-user/cart

This will Create/Update items in the cart with products and its quantity based on their availability in the cart.

This returns the Added or Updated Cart item in JSON format.

