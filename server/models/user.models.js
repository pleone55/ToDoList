const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "**Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {timestamps: true});

module.exports = mongoose.model('user', UserSchema);