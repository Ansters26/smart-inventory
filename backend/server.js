const express = require('express');
const cookieParser =require( 'cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const alertRoutes = require('./routes/alertRoutes');
const forcastRoutes = require('./routes/forcastRoutes')
const { isAuthenticated } = require('./middleware/Auth');
dotenv.config();
connectDB();


const app = express();
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true               
}));
app.use(express.json());
app.use(express.urlencoded());


app.use('/api/products',isAuthenticated,productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/transactions',isAuthenticated,transactionRoutes);
app.use('/api/alerts',alertRoutes);
app.use('/api/forcast',forcastRoutes);
app.get('/',(req,res)=>{
    res.send('Welcome');
})

app.listen(process.env.PORT,()=>{console.log(`Server is running on ${process.env.PORT}`)});