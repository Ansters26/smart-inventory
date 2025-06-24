const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
dotenv.config();
connectDB();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


app.use('/products',productRoutes);
app.use('/users',userRoutes);
app.use('/transactions',transactionRoutes);

app.get('/',(req,res)=>{
    res.send('Welcome');
})

app.listen(process.env.PORT,()=>{console.log(`Server is running on ${process.env.PORT}`)});