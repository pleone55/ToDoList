const express = require('express');
const cors = require('cors');

const app = express();

//middleware to make cross-origin requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 7000;

require('./server/config/mongoose.config');

app.use('/api/users', require('./server/routes/user.routes'));

app.listen(PORT, function() {
    console.log(`Now listening on port ${PORT}`)
});