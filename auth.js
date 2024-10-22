const LocalStrategy = require('passport-local').Strategy;
const Person = require("./DataBase/models/person");
const Menu = require("./DataBase/models/Menu");
const Passport = require('passport');


Passport.use(new LocalStrategy (async(USERNAME,password,done)=>{
    try{
      // console.log('Received credentials:',USERNAME,password);
      const user =await Person.findOne({username:USERNAME});
      if(!user){
        return done(null,false,{message:'Invalid username'});
      }
      // const isPasswordMatch = user.password === password ? true : false;
      const isPasswordMatch = user.comparePassword(password);

      if(isPasswordMatch){
        return done(null, user);
      }
      else{
        return done(null, false,{message: 'Incorrect Password. '})
      }

    }
    catch(e){
      done(e);
    }
}))

// const localAuthMiddleware = Passport.authenticate('local',{session:false})

// app.use(Passport.initialize())

module.exports = Passport;