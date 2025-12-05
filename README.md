Lernevo Backend Take-Home Assignment – Task 1

Role-Based Authentication Service (RBAC)
Author: Sai Naresh
Tech Stack: Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt

Overview:
This project is my implementation of Task 1 – Robust Role-Based Authentication Service, as given by Lernevo Solutions for the Backend Developer Assessment.
The goal of this project is to build a secure authentication system with role-based access control, ensuring that certain routes can only be accessed by specific user roles.
This project strictly follows all requirements mentioned in the assessment.

Features Implemented
 User registration
 Secure login using JWT
 Password hashing using bcrypt
 JWT middleware for route protection
 Role-based middleware (RBAC)
 
Accessible roles:
user
trainer
admin
super_admin

Special Rule Implemented
admin role must NOT access the super-admin route
Only super_admin should be able to see all users.

Protected Routes
/me → accessible by any logged-in user
/super-admin/users → only super_admin

Project Structure:
LernevoTask
│── app.js
│── package.json
│── .env.example
│── dbconnect/
│     └── db.js
│── model/
│     └── model.js

API Documentation:
1.POST /register
{
  "name": "SuperAdmin",
  "email": "super@gmail.com",
  "password": "123456",
  "role": "super_admin"
}
2.POST /login
{
  "email": "super@gmail.com",
  "password": "123456"
}
Response Example:
{
  "success": true,
  "message": "Login Successfully",
  "Token": "<token_here>"
}
3. Get Logged-In User Details
GET /me
Required Header:Authorization: Bearer <token>

4. Super Admin — Get All Users
GET /super-admin/users
 Authorization: Bearer <token>

