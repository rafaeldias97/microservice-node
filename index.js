const mongoose = require('mongoose');
require('dotenv').config({ path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env" });

// connect to rabbit broker
const UserQueue = require('./src/queue/UserQueue');

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
    .then((result) => {
        new UserQueue();
    }).catch((error) => console.log(error));
