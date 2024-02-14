Inventory Management System Documentation

Introduction
Welcome to the documentation for the backend of Inventory Management System. This document provides an overview of the backend architecture, setup instructions, API endpoints, and other relevant information for developers and stakeholders.

Getting Started with Cloning the Repo
To get started with the backend project, follow these steps:
1: Clone the repository from GitHub:
git clone  https://github.com/HaseebSharif/inventery-management-system.git

2: Change into the project directory:
cd your-backend-repo

Installing Dependencies

After cloning the repository, install the project dependencies using npm: 
npm install

Project Structure

The backend project follows a standard structure for organizing code and resources:

your-backend-repo/
├── config/             # Configuration files (e.g., database configuration)
├── controllers/        # Controller functions for handling API requests
├── middleware/         # Custom middleware functions
├── models/             # Database models (e.g., Mongoose models)
├── routes/             # Route definitions for API endpoints
├── server.js           # Entry point for the server


Configuration

Environment Variables
The backend project uses environment variables for configuration. You can set these variables in a .env file located in the root directory of the project. An example .env file may contain the following variables:
PORT=3000
DATABASE_URL=mongodb://localhost:27017/your-database
SECRET_TOKEN_KEY= Your Secret Key


Running the Server
To start the backend server, run the following command:
npm start

By default, the server will run on the port specified in the .env file.

API Documentation

The backend provides the following API endpoints:

User Registration , Login and Logout End Points:
•	GET /api/user/register: Registers the new User 
•	POST /api/user/login: Logs In the User
•	GET /api/user/logout: Logs Out the User



End Points for Products:
•	GET /api/product: Get all Products
•	POST /api/product/create: Create a new product
•	GET /api/ product/:id: Get a single product by ID
•	PUT /api/ product/:id: Update a product by ID
•	DELETE /api/ product/:id: Delete a product by ID

End Points for Importing and Exporting Data:
•	POST /api/import: Import a .csv file and save data in products collection
•	GET /api/download: Download all records in excel format from products collection.

Contact
For any inquiries or support, please contact Muhammad Haseeb.
