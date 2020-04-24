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

//route to create a new task that is associated with the user logged in
router.post('/', [auth,
    //check that the task is filled out
    check('taskName', 'Task is required').not().isEmpty()],
    async(req, res) => {
        //generate an array of errors if validation fails
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        //pass the task description and if completed to the body
        const { taskName, completed } = req.body;
        //create a new task object associated to the user logged in
        try {
            const newTask = new Task({
                taskName,
                completed,
                user: req.user.id
            });
            //after passing validation save new task to the user
            const task = await newTask.save();
            res.json(task);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});
module.exports = router;