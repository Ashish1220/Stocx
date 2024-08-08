const express= require('express')
const User = require('./models/model'); // Ensure this path and naming are correct

const app=express();

app.use(express.urlencoded({extended:false}));
app.post('/',async (req,res)=>{
    console.log(req.body.name);
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        current_funds:req.body.cf,
        role:req.body.role,
        

      });
      const savedUser = await newUser.save();

      console.log(savedUser);
      
      res.send("done");
})

app.listen(8000,()=>{
    console.log('Server Started!');
})