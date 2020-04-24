const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/user.models');
const Task = require('../models/task.models');

//route to get all tasks. Route is protected to avoid unknown users from
//seeing tasks that aren't theres
router.get('/', auth, async(req, res) => {
    try {
        //find the tasks associated with the user and sort them by newest first
        const tasks = await Task.find({ user: req.user.id }).sort({ date: -1 });
        res.json(tasks)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});
module.exports = router;