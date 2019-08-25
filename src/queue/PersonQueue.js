const RabbitMQ = require("../service/RabbitMQ");

module.exports = class PersonQueue {
    constructor () {
        new RabbitMQ({ 
            callback: this.SavePersonConsumer, // Function Tigger 
            address: 'amqp://guest:guest@rabbit:5672', // Address Queue
            q: "SavePerson" // Name Queue
        }).consumer();

        setTimeout(() => {
            this.SavePersonPublisher()
        }, 5000);
    }

    SavePersonConsumer (msg) {
        console.log(msg)
    }

    SavePersonPublisher () {
        new RabbitMQ({ address: 'amqp://guest:guest@rabbit:5672', q: "SavePerson"})
            .publisher({ nome: "Rafael" });
    }
}