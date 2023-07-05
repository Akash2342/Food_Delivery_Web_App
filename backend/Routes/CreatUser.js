const express = require('express')
const router = express.Router()

//requiring schema from user
const User = require('../models/User')

// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');

const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const jwtSecret = "jjdnnwnkfnfjsnksdnjskjncjnjdjkmkmkmmkmk";

//we are creating data in the proper schema
router.post("/creatuser", [
    // username must be an email
    body('email').isEmail(),
   // body('name').isLength({ min: 5 }),
    // password must be at least 5 chars long
    body('password', 'incorrect password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt=await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash( req.body.password,salt)

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            }).then(res.json({ success: true }))

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })


router.post("/loginuser", [
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'incorrect password').isLength({ min: 5 })]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {

            //findOne is functionused to check weather that email exist in database or not
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct email" })
            }

           // console.log(req.body)
           // console.log(userData.password);
           //will reture true if password is correct
           const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging with correct password" })
            }
        
          const data={
            user:{
                id:userData.id
            }
          }

           const authToken= jwt.sign(data,jwtSecret)

            return res.json({ success: true, authToken:authToken })

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

module.exports = router;