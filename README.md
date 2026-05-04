# 🛒 Pahuja Traders

A full-stack e-commerce web application built using modern web technologies. This project demonstrates core concepts of frontend–backend integration, authentication, and scalable architecture.

---

## 🚀 Tech Stack

**Frontend**

* React (Vite)
* JavaScript (ES6+)
* CSS

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB

---

## 📦 Features

* 🔐 User Authentication (Register/Login)
* 🛍️ Product Listing
* 🛒 Add to Cart functionality
* 👤 User Profile Management
* 🛠️ Admin Panel (manage products/users)
* 🔄 REST API integration

---

## 📁 Project Structure

```
pahuja-traders/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Manas-codezz/pahuja_traders.git
cd pahuja_traders
```

---

### 2. Install dependencies

```bash
# Install root dependencies (if applicable)
npm install

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

### 3. Environment Variables

Create a `.env` file inside `backend/` and add:

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4. Run the application

From root:

```bash
npm run dev
```

Or run separately:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

---

## 🌐 API Overview

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| POST   | /api/auth/register | Register user    |
| POST   | /api/auth/login    | Login user       |
| GET    | /api/products      | Get all products |
| POST   | /api/cart          | Add to cart      |

---

## 🧠 Learning Outcomes

* Full-stack application architecture
* REST API design
* Authentication with JWT
* State management in React
* Git & GitHub workflow

---

## 📌 Future Improvements

* Payment Gateway Integration
* Order Management System
* Responsive UI enhancements
* Role-based access control
* Deployment (Vercel + Render)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Manas Kukreja**
GitHub: https://github.com/Manas-codezz

---
