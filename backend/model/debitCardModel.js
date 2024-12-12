const mongoose = require("mongoose");

const debitCardSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
  cardNumber: {
     type: String, 
    required: true 
},
  nameOnCard: {
     type: String, 
    required: true 
},
  expiration: {
     type: String, 
    required: true 
},
  cvc: {
     type: String, 
    required: true 
},
  createdAt: {
     type: 
    Date, 
    default: Date.now 
},
});

const DebitCard =  mongoose.model("DebitCard", debitCardSchema);
module.exports =DebitCard;
