const router=require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcrypt")
router.post("/register",async (req,res)=>{

 try{
  //generate new password

  const salt=await bcrypt.genSalt(10);
  const hashedPassword=await bcrypt.hash(req.body.password,salt);
  //create new user
  const newUser=new User({
    username:req.body.username,
    email:req.body.email,
    password:hashedPassword,
   })
   //save user and return response
  const user=await newUser.save();
  res.status(200).json(user);
 }catch(err){
  console.log(err)
  res.status(500).json({ error: "Internal Server Error", message: err.message });

 }
});
router.post("/login", async (req, res) => {
  try {
    console.log("Login Request Body:", req.body);

    const user = await User.findOne({
      email: req.body.email,
    });

    console.log("Retrieved User:", user);

    // Check if user exists
    if (!user) {
      console.log("User not found");
      return res.status(404).json("User not found");
    }

    // Check password validity
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    console.log("Valid Password:", validPassword);

    if (!validPassword) {
      console.log("Invalid Password");
      return res.status(400).json("Wrong password");
    }

    // If everything is valid, return user information
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
});

module.exports=router;