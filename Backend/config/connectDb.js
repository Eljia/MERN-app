const mongoose=require('mongoose');
require("dotenv").config({path:"./config/.env"})
const connectDb = async () => {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  
    try {
      await mongoose.connect(process.env.MONGO_URL, opts);
      console.log("THE DATABASE IS CONNECTED....");
    } catch (error) {
      console.log(error);
    }
  
    //
  };
  
  module.exports = connectDb;