const RabbitMQ = require("../service/RabbitMQ");
const PersonRepository = require("../context/PersonRepository");
const personRepository = new PersonRepository();

let Person = require("../models/Person")

module.exports = class PersonQueue {
    constructor (test = false) {
        if (test) return true
        
        new RabbitMQ({ 
            callback: this.SavePersonConsumer, // Function Tigger 
            address: 'amqp://guest:guest@rabbit:5672', // Address Queue
            q: "SavePerson" // Name Queue
        }).consumer();

        setTimeout(() => {
            this.SavePersonPublisher()
        }, 5000);
    }

    async SavePersonConsumer (msg) {
        let _person = new Person(msg);
        await personRepository.Post(_person);
        return msg;
    }

    SavePersonPublisher () {
        new RabbitMQ({ address: 'amqp://guest:guest@rabbit:5672', q: "SavePerson"})
            .publisher({
                name: "Rafael Dias",
                email: "rafael.cdc97@gmail.com"
            });
    }
}