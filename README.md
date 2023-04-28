# MERN-E-Commerce-Backend

MERN-E-Commerce-Backend is the backend of an e-commerce web application built with MongoDB, NodeJS, and ExpressJS.

## Features


- User authentication and authorization(JWT)
- Admin dashboard for managing products, orders, and users
- Payemnt Gateway
- Mail Service
- Forgot Password & Reset Password
- Product listing and search
- Product details and reviews
- Cart management
- Order history 

## Tech Stack

- MongoDB
- NodeJS
- ExpressJS

## Installation and Usage

To run the backend server on your local machine, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/Saurabh-8585/MERN-E-Commerce-Backend.git
   ```

2. Install the dependencies:

   ```
   cd MERN-E-Commerce-Backend
   npm install
   ```

3. Set up the environment variables by creating a `.env` file in the root directory and adding the following variables:

   ```
   MONGO_URL=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   RAZORPAY_API_KEY
   RAZORPAY_API_SECRET
   EMAIL
   EMAIL_PASSWORD
   PAYMENT_SUCCESS
   FORGOT_PASSWORD
   GO_TO_CART
   
   ```

4. Start the development server:

   ```
   npm start
   ```

## Contributing

Contributions to the project are welcome. If you find a bug or want to add a new feature, please create a new issue or pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
