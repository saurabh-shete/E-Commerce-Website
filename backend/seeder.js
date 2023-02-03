const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./Data/Users');
const User = require('./models/user');
const Product = require('./models/ProductModel');
const Order = require('./models/OrderModel');
const products = require('./Data/products');
const connectDB = require('./config/db');
require('colours');


dotenv.config()

connectDB();

const importData = async () =>{
  try {
      await Order.deleteMany();
      await Product.deleteMany();
      await User.deleteMany();
      const createUser = await User.insertMany(users);
      const adminUser = createUser[0]._id;
      const sampledata = products.map(product=>{
        return {...product,User:adminUser};
      })
      await Product.insertMany(sampledata);
      console.log('Data Imported!!'.green.inverse);
      process.exit();
  } catch (error) {
    console.log(`Error : ${error}`.red.inverse);
    process.exit(1);
  }
};

const dataDestroy = async () =>{
  try {
      await Order.deleteMany();
      await User.deleteMany();
      await Product.deleteMany();
      console.log('Data Deleted!!'.green.inverse);
  } catch (error) {
      console.log(`Error : ${error}`.red.inverse);
  } 
}

if(process.argv[2]==='-d'){
  dataDestroy();
}
else{ 
  importData();
}