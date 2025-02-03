require("dotenv").config({ path: ".env.local" });
const express = require("express");
const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.get("/restaurants", async (req, res) => {
  try {
    const sortOrder = req.query.sortBy === "DESC" ? -1 : 1;
    const restaurants = await Restaurant.find(
      {},
      "cuisine name city restaurant_id",
    ).sort({ restaurant_id: sortOrder });
    res.json(restaurants);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
});

app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ cuisine: req.params.cuisine });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/restaurants/Delicatessen", async (_, res) => {
  try {
    const restaurants = await Restaurant.find(
      { cuisine: "Delicatessen", city: { $ne: "Brooklyn" } },
      "cuisine name city -_id",
    ).sort({ name: 1 });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
