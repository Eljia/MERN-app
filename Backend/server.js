const express = require('express')
const app = express();
const authRoutes=require("./routes/authRoutes")
const connectDb=require("./config/connectDb")
//middelwares
app.use(express.json())

//connect DB
connectDb();

app.use("/auth",authRoutes)


//1 start server
const port = process.env.PORT ||5000
app.listen(port, (err) =>err ? console.error(err) : console.log(`server is listening on port ${port}!`))