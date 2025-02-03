const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  address: {
    building: String,
    street: String,
    zipcode: String,
  },
  city: String,
  restaurant_id: String,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
