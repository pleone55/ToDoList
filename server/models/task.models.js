const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    taskName: {
        type: String,
        required: [
            true,
            "Task is required"
        ],
        minlength: [
            3,
            "Task must be greater than 3 characters"
        ]
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

module.exports = mongoose.model('task', TaskSchema);