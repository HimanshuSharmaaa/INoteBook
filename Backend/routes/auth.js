const express = require("express");
const UserModel = require("../models/UserModel");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUserData = require("../MiddleWare/fetchuserdata");
const JWT_SECRECT = "HimanshuisagoodB$oy";

// Route 1 : Create a user using /api/auth/creteuser Endpoint
router.post("/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a strong Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors , return Bad Request and the errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({success ,  error : error.array() });
    }

    try {
      // Check Whether the user with this same exists already or not
      let individualUserData = await UserModel.findOne({
        email: req.body.email,
      });

      if (individualUserData) {
        return res.status(400).json({success ,  error: "Sorry user with this email is already exists." });
      }

      const salt = await bcryptjs.genSalt(10);
      const secretPassword = await bcryptjs.hash(req.body.password, salt);

      individualUserData = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: secretPassword,
      });

      const data = {
        user: {
          id: individualUserData.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRECT);
      success = true;
      res.json({success , authToken, "Genetrated AuthToken token no. : " : authToken});
    } 

    catch (error) {
      success = false;
      res.status(500).json({success , error:"Some Error Occur In Finding & Create New User Details. Check in the try and catch."});
      console.error(error.message);
    }
  }
);

// Route 2 : Authenticate user with /api/auth/login endpoint
router.post("/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password Cannot be blank").exists(),
  ],
  async(req, res) => {

    let success = false;
    // If there are errors , return Bad Request and the errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({success,  error : error.array() });
    }
  
    const {email , password} = req.body;

    try{
      let individualUserData = await UserModel.findOne({email});
      if(!individualUserData){
        return res.status(400).json({success ,  error : "User Doesn't exits. Enter Correct infomation to login. " });
      }

      const passwordCompare = await bcryptjs.compare(password , individualUserData.password);
      if(!passwordCompare){
        return res.status(400).json({success ,  error : "Enter Correct password to login. " });
      }

      const data = {
        user: {
          id: individualUserData.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRECT);
      success = true;
      res.json({ success , authToken, "Genetrated AuthToken token no. : " : authToken});

    } catch(error){
      success = false;
      res.status(500).json({ success , error: "Some Error Occur In Finding User. Check in the try and catch." });
      console.error(error.message);
    }
});


// Route 3 : loggin User details with /api/auth/getUserdetails endpoint

// fetchUserData is a middleware gives us user id . (Middlewaare is nothing just a function)
router.post("/getUserdetails", fetchUserData ,async(req, res) => {
    try {
      const userid = req.user.id;
      // using( .select('-password') ) for no one access the password form the user details. 
      const user = await UserModel.findById(userid).select("-password");
      res.send(user);
      
    } catch (error) {
      res.status(500).json({
        error:
          "Some Error Occur In Finding User. Check in the try and catch.",
      });
      console.error(error.message);
    }
  });

module.exports = router;  