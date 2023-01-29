const mongoose = require('mongoose');
require('colours');


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log();
    console.log(`Mongodb Connected ${conn.connection.host}`.rainbow); 
  } catch (error) {
    console.log(`Error: ${error.message}`.underline.red);
    process.exit(1);
  }
}

module.exports = connectDB;