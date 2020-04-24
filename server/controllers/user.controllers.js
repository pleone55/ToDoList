//Used for testing in PostMan to get users and delete unnecessary ones

const { User } = require('../models/user.models');

module.exports.getUsers = (req, res) => {
    User.find({})
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
};

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(user => res.json(user))
        .catch(err => res.json(err));
};