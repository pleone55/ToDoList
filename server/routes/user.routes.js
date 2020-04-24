const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/user.models');

//post route to create user that returns a promise and is validated by the
//express-validator
router.post('/', [
    //ensure name is entered
    check('name', 'Name is required').not().isEmpty(),
    //ensure email is valid
    check('email', 'Email is required').isEmail(),
    //ensure password is min length of 6 characters
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async(req, res) => {
    //return an array of errors if validation fails
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    //pass the user info to the body 
    const { name, email, password } = req.body;

    try {
        //Find user by email and check if user already exists
        let user = await User.findOne({ email })
        if(user){
            return res.status(400).json({ msg: 'User already exists '});
        }
        //create new user object
        user = new User({
            name, 
            email,
            password
        });
        //hash the user's password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //save the user after passing all validations and protecting password
        await user.save();

        //validate new user is created
        res.send("User saved");

        //the payload is 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
module.exports = router;