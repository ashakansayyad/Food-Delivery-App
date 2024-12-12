const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender:{
    type:String,
    required:false,
    default:"Male",
  },
  country:{
    type:String,
    required:false,
    default:"India"
  },
  addresses: [
    {
      address: {
        type: String,
        required: true,
      },
      isDefault: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
