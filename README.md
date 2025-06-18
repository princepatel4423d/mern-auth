# MERN Stack Authentication System 🔐

This is a full-stack MERN authentication starter project that includes:

- User Signup
- Login
- Email verification with OTP
- Password reset with OTP
- Secure password hashing with bcrypt
- JWT-based authentication

> ⚡ Build faster and focus on what matters. This project saves you setup time and lets you implement custom features right away.

---

## 🚀 Tech Stack

- **Frontend**: React, Axios, React Router, Toastify
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Emailing**: Nodemailer
- **Security**: bcrypt, JWT
- **Environment Management**: dotenv

---

## 🔐 Features

### ✅ Signup
- Register with name, email, and password.
- OTP sent to email for verification.

### ✅ Login
- Authenticates via email and password.
- JWT token issued on success.

### ✅ Email Verification with OTP
- Sends OTP to registered email.

### ✅ Reset Password with OTP
- Sends OTP to user's email.
- Allows secure password reset upon OTP validation.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/princepatel4423d/mern-auth.git
cd mern-auth
```

### 2. Setup Backend

```bash
cd server
npm install
```

```bash
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV='development'
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password_or_app_password
SENDER_EMAIL=senders's_email
```

```bash
npx nodemon server.js
```

### 3. Setup Frontend
```bash
cd ../client
npm install
npm run dev
```

## 👨‍💻 Connect with Me

I’d love to hear your feedback, contributions, or collaborations! Feel free to connect with me on any platform below:

- GitHub: [@princepatel4423d](https://github.com/princepatel4423d)
- LinkedIn: [@princepatel4423d](https://linkedin.com/in/princepatel4423d)
- Twitter: [@princep4423d](https://twitter.com/princep4423d)
- Email: princep4423d@gmail.com

---

## 📃 License

This project is licensed under the **MIT License**.
