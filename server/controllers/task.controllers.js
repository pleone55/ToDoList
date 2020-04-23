const { Task } = require('../models/task.models');

module.exports.createTask = (req, res) => {
    const { taskName, completed, date } = req.body;
    Task.create({ taskName, completed, date })
        .then(task => res.json(task))
        .catch(err => res.status(400).json(err));
};

module.exports.getTasks = (req, res) => {
    Task.find({})
        .then(task => res.json(task))
        .catch(err => res.status(500).json(err));
};

module.exports.updateTask = (req, res) => {
    Task.findOne({ _id: req.params.id }, req.body, {new: true})
        .then(task => res.json(task))
        .catch(err => res.json(err));
};

module.exports.deleteTask = (req, res) => {
    Task.deleteOne({ _id: req.params.id })
        .then(task => res.json(task))
        .catch(err => res.json(err));
};