 # Linkedin www.linkedin.com/in/tumu-indra-reddy


# 🎒 Foundry — Campus Lost & Found Portal

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens)
![HTML5](https://img.shields.io/badge/HTML5-Frontend-E34F26?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-Styling-1572B6?style=for-the-badge&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### A Modern Full-Stack Campus Lost & Found Management System

**Developed for**
**Sai University**
**Web Technology & Internet Programming (WTIP)**
**Individual Project (2026–2027)**

---

*A secure, responsive, and user-friendly platform that simplifies reporting, searching, claiming, and managing lost and found items across the university campus.*

</div>

---

# 📖 Table of Contents

- Project Overview
- Key Features
- Technology Stack
- System Architecture
- Project Structure
- Installation
- Environment Variables
- Running the Project
- Demo Credentials
- API Documentation
- Authentication
- Search & Filtering
- User Roles
- Postman Testing
- Database Seeding
- Deployment
- Security Features
- Future Enhancements
- Screenshots
- Submission Checklist
- License

---

# 📚 Project Overview

**Foundry – Campus Lost & Found Portal** is a complete **MERN-style backend web application** built using **Node.js, Express.js, MongoDB, and Vanilla JavaScript**.

The system digitalizes the traditional lost-and-found process within a university campus.

Instead of relying on notice boards or manual records, students and faculty can:

- Report lost items
- Report found items
- Search existing reports
- Submit ownership claims
- Approve or reject claims
- Track claim progress
- Manage their own listings
- Access administrator moderation tools

The application follows RESTful API principles and includes JWT-based authentication, role-based authorization, secure password hashing, image uploads, filtering, sorting, dashboards, and complete Postman API testing.

---

# ✨ Key Features

## 🔐 Authentication & Security

- User Registration
- User Login
- Secure Logout
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization
- Owner Authorization
- Admin Authorization
- Login Rate Limiting

---

## 📦 Lost & Found Management

- Create Lost Reports
- Create Found Reports
- Edit Reports
- Delete Reports
- View Individual Reports
- Browse All Reports
- Upload Images
- Pagination Support

---

## 🔎 Search & Filters

Users can quickly locate reports using:

- Keyword Search
- Category Filter
- Report Type Filter
- Location Filter
- Date Filter

### Custom Feature

✔ Sort by

- Newest First
- Oldest First

---

## 🤝 Claim Management

Users can:

- Submit Claims
- Track Claim Status
- View Submitted Claims
- View Claims Received
- Approve Claims
- Reject Claims

Claim Status:

- Pending
- Approved
- Rejected

---

## 👤 User Dashboard

Every authenticated user has access to:

- My Reports
- My Claims
- Claims Received
- Profile Information

---

## 🛡 Admin Dashboard

Administrator features include:

- View All Users
- View All Claims
- Moderate Reports
- Platform Statistics
- Claim Review
- Listing Management

---

# 🛠 Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)
- Fetch API

---

## Backend

- Node.js
- Express.js

---

## Database

- MongoDB
- Mongoose ODM

---

## Authentication

- JWT
- bcrypt

---

## File Upload

- Multer

---

## API Testing

- Postman

---

# 🏗 System Architecture

```
                +----------------------+
                |      Browser         |
                | HTML • CSS • JS      |
                +----------+-----------+
                           |
                    HTTP Requests
                           |
                           ▼
               +----------------------+
               |    Express Server    |
               |   RESTful API Layer  |
               +----------+-----------+
                           |
             JWT Authentication Middleware
                           |
                           ▼
                 Business Logic Layer
                           |
                           ▼
                    MongoDB Database
            (Users • Items • Claims)
```

---

# 📁 Project Structure

```
campus-lost-found/
│
├── config/
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── uploads/
│
├── public/
│
├── postman/
│
├── seed/
│
├── .env.example
├── package.json
├── server.js
└── README.md
```

---

# ⚙ Prerequisites

Before running the application, install:

- Node.js 20+
- npm
- MongoDB Community Server
  OR
- MongoDB Atlas
- Git
- Postman

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/yourusername/campus-lost-found.git
```

Move into the project directory

```bash
cd campus-lost-found
```

Install dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Copy the example file.

### macOS / Linux

```bash
cp .env.example .env
```

### Windows PowerShell

```powershell
Copy-Item .env.example .env
```

Update the following variables.

```env
PORT=3000

MONGODB_URI=mongodb://localhost:27017/campuslostfound

JWT_SECRET=your_super_secret_key_minimum_32_characters

ADMIN_EMAIL=admin@example.com

ADMIN_PASSWORD=StrongPassword123
```

> Never commit your `.env` file to GitHub.

---

# 🌱 Seed the Database

Populate MongoDB with demo data.

```bash
npm run seed
```

The seed script creates:

- Administrator Account
- 12 Sample Reports
- Sample Categories
- Demo Data

Running the seed multiple times **will not create duplicates**.

---

# ▶ Running the Application

Production

```bash
npm start
```

Development

```bash
npm run dev
```

Visit

```
http://localhost:3000
```

---

# 👨‍💻 Administrator Login

Use the credentials stored inside your `.env` file.

```
ADMIN_EMAIL

ADMIN_PASSWORD
```

---

# 📡 REST API

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/me |

---

## Items

| Method | Endpoint |
|---------|----------|
| GET | /api/items |
| GET | /api/items/:id |
| POST | /api/items |
| PATCH | /api/items/:id |
| DELETE | /api/items/:id |
| GET | /api/items/mine |

---

## Claims

| Method | Endpoint |
|---------|----------|
| POST | /api/claims |
| GET | /api/claims/mine |
| GET | /api/claims/received |
| PATCH | /api/claims/:id |

---

## Admin

| Method | Endpoint |
|---------|----------|
| GET | /api/admin/stats |
| GET | /api/admin/claims |

---

# 🔒 Authentication

Protected endpoints require

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 🖼 Image Upload

Supported Formats

- JPG
- JPEG
- PNG
- WebP

Maximum Size

```
3 MB
```

Multipart Field

```
image
```

---

# 🔍 Search Parameters

```
keyword

category

location

type

sort

page

limit
```

Sorting

```
Newest

Oldest
```

---

# 👥 User Roles

## Student/User

- Register
- Login
- Report Lost Item
- Report Found Item
- Submit Claim
- Manage Own Reports
- View Dashboard

---

## Administrator

Everything a User Can Do

PLUS

- Review Claims
- Platform Statistics
- Moderate Listings
- Manage Reports

---

# 📮 Postman Testing

Import

```
postman/Campus-Lost-Found.postman_collection.json
```

Set

```
baseUrl=http://localhost:3000
```

Recommended Test Flow

1. Register
2. Login
3. Get JWT
4. Create Report
5. View Reports
6. Search Reports
7. Submit Claim
8. Approve Claim
9. View Statistics
10. Delete Report

---

# 🎯 Demonstration Flow

1. Launch the application.
2. Show homepage.
3. Search reports.
4. Filter reports.
5. Register User A.
6. Register User B.
7. User A creates a Found report.
8. User B submits a Claim.
9. User A approves Claim.
10. User B checks updated status.
11. Login as Administrator.
12. Display statistics dashboard.
13. Execute Postman API collection.

---

# 🔐 Security Features

✔ bcrypt Password Hashing

✔ JWT Authentication

✔ Protected API Routes

✔ Ownership Validation

✔ Role-Based Authorization

✔ Login Rate Limiting

✔ Input Validation

✔ File Type Validation

✔ File Size Validation

✔ MongoDB ObjectID Validation

✔ Environment Variable Protection

---

# 🚀 Deployment

Recommended Hosting

- Render
- Railway
- Cyclic
- Azure App Service

Deployment Steps

1. Push project to GitHub
2. Create MongoDB Atlas Cluster
3. Configure Environment Variables
4. Deploy Node.js Application
5. Run Seed Script
6. Verify APIs
7. Verify Frontend

---

# 🔮 Future Enhancements

- Email Notifications
- OTP Verification
- Google Login
- QR Code Based Claims
- AI Image Matching
- Mobile Application
- Push Notifications
- Real-Time Chat
- Cloud Storage
- Admin Analytics Dashboard
- Dark Mode
- PWA Support

---

# 📷 Screenshots

Add screenshots before submission.

```
Home Page

Registration

Login

Dashboard

Lost Report

Found Report

Claim Submission

Admin Dashboard

Postman Collection

MongoDB Database
```

---



---

# 👨‍🎓 Academic Information

**Course:** Web Technology & Internet Programming

**Project:** Campus Lost & Found Portal

**University:** Sai University

**Academic Year:** 2026–2027

**Project Type:** Individual Project

---

# 📄 License

This project was developed solely for academic purposes as part of the Web Technology & Internet Programming coursework at Sai University.

---

<div align="center">

## ⭐ If you found this project useful, consider giving it a star!

**Foundry — Making Campus Lost & Found Smarter, Faster, and More Reliable.**

Made with ❤️ using Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript.

</div>
