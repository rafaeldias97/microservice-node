const amqp = require('amqp');
const mongoose = require('mongoose');
require('dotenv').config({ path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env" })

// connect to rabbit broker
const UserQueue = require('./src/queue/UserQueue');

const conn = amqp.createConnection({url: process.env.RABBITMQ});

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
    .then((result) => {
        conn.on('ready', () => {
            new UserQueue({ conn: conn });
        });
        conn.on('error', (e) => console.log('Error from amqp: ', e));
    }).catch((error) => console.log(error));
