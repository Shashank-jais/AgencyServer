# 🚀 AgencyServer

**AgencyServer** is a backend server designed to manage agencies and user authentication efficiently. It provides APIs for handling user registrations, authentication, and managing agency records, including financial transactions.  

## 📌 Features

- 🔒 User authentication (Register, Login, Logout)  
- 📊 Manage agency records with transaction history  
- 📅 Fetch agency data based on date filters  
- 🔄 Update and maintain agency differences dynamically  
- 🛡️ Secure endpoints with authentication middleware  

---

## 📁 Project Structure

```
/AgencyServer
├── controllers
│   ├── agencyMainController.js   # Handles agency operations
│   ├── userController.js         # Handles user authentication
├── models
│   ├── agencyModel.js            # Agency data schema
│   ├── agencyDiffModel.js        # Agency difference schema
│   ├── userModel.js              # User data schema
├── routes
│   ├── agencyRoutes.js           # API routes
├── middleware
│   ├── auth.js                   # Authentication middleware
└── utils
    ├── generatedAccessToken.js    # Token generator
    ├── generatedRefreshToken.js   # Refresh token handler
```

---

## 🛠️ Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Shashank-jais/AgencyServer.git
   cd AgencyServer
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Set up environment variables** (Create a `.env` file)  
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the server**  
   ```bash
   npm start
   ```

---

## 🔌 API Endpoints

### 🧑‍💻 User Routes

| Method | Endpoint         | Description              | Authentication |
|--------|----------------|--------------------------|----------------|
| POST   | `/user/register` | Register a new user      | ❌ No          |
| POST   | `/user/login`    | Authenticate user        | ❌ No          |
| GET    | `/user/allUser`  | Fetch all users         | ✅ Yes         |
| GET    | `/user/logout`   | Logout user             | ✅ Yes         |

### 🏢 Agency Routes

| Method | Endpoint          | Description                        | Authentication |
|--------|------------------|------------------------------------|----------------|
| POST   | `/addrecord`      | Add agency record                 | ✅ Yes         |
| GET    | `/totaldetails`   | Get agency total calculations     | ✅ Yes         |
| POST   | `/recordbyagencyid` | Fetch records by agency ID       | ✅ Yes         |
| POST   | `/updaterecord`   | Update an existing agency record  | ✅ Yes         |

---

## 🔧 Technologies Used

- **Node.js** - Server-side runtime  
- **Express.js** - Web framework for APIs  
- **MongoDB & Mongoose** - NoSQL database and ORM  
- **Bcrypt.js** - Password hashing for security  
- **JWT (JSON Web Tokens)** - Secure authentication  

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

👤 **Shashank Jaiswal**  
📧 [Email](shashankjaiswal266@gmail.com)
🔗 [Portfolio](https://portfolio-ndck.vercel.app/)  

Feel free to modify this README as needed! 🚀
