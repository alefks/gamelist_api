const mongoose = require('mongoose');

mongoose.connection("mongodb://localhost/db_games", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

module.exports = mongoose;