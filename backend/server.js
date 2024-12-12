const express = require("express");
const bodyParser = require('body-parser'); 
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");
const app = express();
const userRoute = require('./routes/userRoutes');
const cardRoute = require("./routes/cardRoutes");
const cartRoute = require('./routes/cartRoutes');
const debitCardRoute = require('./routes/debitCardRoutes');
dotenv.config();



app.use(cors());
app.use(bodyParser.json()); //it parse the  json data
app.use(bodyParser.urlencoded({extended:true})); //it parse also form data
app.use("/api/user",userRoute);
app.use("/api/card",cardRoute);
app.use("/api/cart",cartRoute);
app.use("/api/debitCard",debitCardRoute);


mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("MongoDB Connected Successfully!"))
.catch((err) => console.error("Error: ", err));

app.get("/", (req, res) => {
  res.send("Food Delivey App");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
