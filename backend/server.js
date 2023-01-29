const express = require('express');
require('colours');
const products = require('./Data/products');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require("cors");
const productRoutes = require('./routes/productsRoute');
const { errorHandler } = require('./middlewares/errorMiddleware');
const userRoutes = require('./routes/userRoute');
//dotenv config
dotenv.config();
//Database Connection
connectDB();
//Creating app
const app = express();
//Enabling Cross-Origin Resource Sharing
app.use(cors());
//Middleware Bodyparser
app.use(express.json());

app.get("/",(req,res)=>{
  res.send('<h1>welcum</h1>');
});

app.use('/api',productRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);
// app.get("/products",(req,res)=>{
//   res.json(products);
// });

// app.get("/products/:id",(req,res)=>{
//   const product = products.find((p)=>{ return p._id===req.params.id});
//   res.json(product);
// });

const port = 8080;
app.listen(process.env.PORT || port,()=>{
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.inverse);
});