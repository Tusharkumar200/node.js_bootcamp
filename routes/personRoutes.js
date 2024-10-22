const express = require("express");
const router = express.Router();
const Person = require("../DataBase/models/person");
const {jwtAuthMiddleware , generateToken} = require('../jwt');



router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Data Saved...");

    const payload = {
      id: response.id,
      username: response.username,
    }
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token generated...", token);
    

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Login Route

router.post("/login", async (req, res) => {

      try{
        const {username, password} = req.body;
        const user = await Person.findOne({username: username});

        if(!user || !(await user.comparePassword(password))){
          return res.status(401).json({error: "Invalid username or password"});
        }
        // generate Token
        const payload = {
          id: user.id,  
          username: user.username,
        }

        const token = generateToken(payload);
        console.log("Token generated...", token);
        res.json({token});

      }
      catch(error){
        console.log(error);
        res.status(500).json({error: "Internal server error"});
      }
});

// profile route

router.get('/profile', jwtAuthMiddleware, async (req, res) => {

  try{
    const userData = req.user;
    console.log("User Data", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json(user);


  }
  catch(error){
    console.log(error);
    res.status(500).json({error: "Internal server error"});
  }
});

router.get("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log(data);
    console.log("data fetched ");
    res.status(200).json(data);
  } catch (e) {
    console.log("error ", e);
  }
});

router.get("//:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const data = await Person.find({ work: workType });
      console.log(data);
      console.log("data fetched ");
      res.status(200).json(data);
    }
  } catch (e) {
    console.log("error ", e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await Person.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if(!response){
      return res.status(404).json({error: "Person not found"});
    }
    console.log("Data Updated...");
    res.status(200).json(response);



  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Person.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Person not found' });
    }

    console.log("Data Deleted...");
    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


  module.exports = router;
