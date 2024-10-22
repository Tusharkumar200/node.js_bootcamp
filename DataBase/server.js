const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db");

const Passport = require('../auth');
// const Passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const Person = require("./models/person");
const Menu = require("./models/Menu");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

// make a middleware to log all requests
const logRequest = (req, res, next) =>{
  console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
  next();
};

app.use(logRequest);
app.get("/hello",logRequest ,(req, res) => {
  res.send("Hello World");
});

// Passport.use(new LocalStrategy (async(USERNAME,password,done)=>{
//       try{
//         // console.log('Received credentials:',USERNAME,password);
//         const user =await Person.findOne({username:USERNAME});
//         if(!user){
//           return done(null,false,{message:'Invalid username'});
//         }
//         const isPasswordMatch = user.password === password ? true : false;

//         if(isPasswordMatch){
//           return done(null, user);
//         }
//         else{
//           return done(null, false,{message: 'Incorrect Password. '})
//         }

//       }
//       catch(e){
//         done(e);
//       }
// }))

  app.use(Passport.initialize())

  
  app.get('/', function(req,res){
    res.send('Welcome To home page...');
  })

// app.post("/person", async (req, res) => {
//   try {
//     const data = req.body;
//     const newPerson = new Person(data);
//     const response = await newPerson.save();
//     console.log("Data Saved...");
//     res.status(200).json(response);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.get("/person", async (req, res) => {
//   try {
//     const data = await Person.find();
//     console.log(data);
//     console.log("data fetched ");
//     res.status(200).json(data);
//   } catch (e) {
//     console.log("error ", e);
//   }
// });

// app.post("/menu", async (req, res) => {
//   try {
//     const data = req.body;
//     const newMenu = new Menu(data);
//     const response = await newMenu.save();
//     console.log("Data Saved...");
//     res.status(200).json(response);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.get("/menu", async (req, res) => {
//     try {
//         const data = await Menu.find();
//         console.log(data);
//         console.log("data fetched ");
//         res.status(200).json(data);
//     } catch (e) {
//         console.log("error ", e);
//     }
// });

// app.get('/person/:workType', async (req, res) => {

//     try {
//         const workType = req.params.workType;
//         if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
//             const data = await Person.find({work: workType});
//             console.log(data);
//             console.log("data fetched ");
//             res.status(200).json(data);
//         }
//     } catch (e) {
//             console.log("error ", e);
//         }
// });

// import routes file
    const personRoutes = require('../routes/personRoutes');
    const menuRoutes = require('../routes/menuRoutes');
    const localAuthMiddleware = Passport.authenticate('local',{session:false});


    // app.use('/person', personRoutes);
    // app.use('/person',localAuthMiddleware, personRoutes);
    app.use('/person', personRoutes);
    app.use('/menu', menuRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
