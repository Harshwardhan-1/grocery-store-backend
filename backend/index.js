
// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { userRoutes } = require('./Routes/UserRoutes');
const { productRouter } = require('./Routes/product');
const { cartRouter } = require('./Routes/Cart');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static('uploads'));

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use(cors({
    origin: 'https://grocery-shop-frontend-five.vercel.app', // frontend URL
    credentials: true
}));

app.use("/api/all", userRoutes);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
