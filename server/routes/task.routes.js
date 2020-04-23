const TaskController = require('../controllers/task.controllers');

module.exports = app => {
    app.post('/api/tasks', TaskController.createTask);
    app.get('/api/tasks', TaskController.getTasks);
    app.put('/api/tasks/:id', TaskController.updateTask);
    app.delete('/api/tasks/:id', TaskController.deleteTask);
}