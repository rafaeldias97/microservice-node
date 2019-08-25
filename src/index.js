const mongoose = require('mongoose');
const PersonQueue = require("./queue/PersonQueue");

mongoose.connect('mongodb://mongodb:27017/msnode', {
    useNewUrlParser: true
}).then(result => {
    console.log('MongoDB Conectado');
    new PersonQueue();
}).catch(error => {
    console.log(error);
});
