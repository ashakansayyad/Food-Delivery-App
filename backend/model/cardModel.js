const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  imageOne: {
    type: String,
    required: true,
  },
imageTwo:{
  type:String,
  required:false,
},
imageThree:{
  type:String,
  required:false,
},
  restaurant: {
    type: String,
    required: false,
  },
  restaurantName: {
    type: String,
    required: false,
  },
  discount: {
    type: String,
    required: false,
  },
  foodName: {
    type: String,
    required: false,
  },
  price:{
    type:Number,
    required:false,
  },
  titleOne: {
    type: String,
    required: false,
  },
  titleTwo: {
    type: String,
    required: false,
  },
  titleThree: {
    type: String,
    required: false,
  },
  titleFour: {
    type: String,
    required: false,
  },
  cardType: {
    type: String, 
    enum: ["type1", "type2", "type3", "type4","type5","burgers","fries","coldDrinks","reviews"], 
    required: true,
  },
});

const Card = mongoose.model("Card",cardSchema);

module.exports = Card;