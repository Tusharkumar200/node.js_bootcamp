const express = require("express");
const router = express.Router();
const Menu = require("../DataBase/models/Menu");

router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new Menu(data);
      const response = await newMenu.save();
      console.log("Data Saved...");
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  router.get("/", async (req, res) => {
      try {
          const data = await Menu.find();
          console.log(data);
          console.log("data fetched ");
          res.status(200).json(data);
      } catch (e) {
          console.log("error ", e);
          res.status(500).json({ error: "Internal server error" });
      }
  });

  
  module.exports = router;