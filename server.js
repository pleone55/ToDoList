const express = require('express');
const app = express();

const PORT = process.env.PORT || 7000;

require('./server/config/mongoose.config');
require('./server/routes/task.routes')(app);

app.listen(PORT, function() {
    console.log(`Now listening on port ${PORT}`)
});