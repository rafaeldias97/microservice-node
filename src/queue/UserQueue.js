const User = require('../models/User');
const Rabbit = require('rabbit-lib-node');

class UserQueue {
    constructor (test = false ) {
        if (!test) {
            // Example consumer
            new Rabbit({ callback: this.createUser, address: process.env.RABBITMQ, q: 'user.create' }).consumer()
            new Rabbit({ callback: this.dropAllUser, address: process.env.RABBITMQ, q: 'user.deleteAll' }).consumer()

            // Example rpcConsumer
            new Rabbit({ callback: this.getAllUser, address: process.env.RABBITMQ, q: 'user.get' }).rpcRabbit()

            setTimeout(() => {
                new Rabbit({ address: process.env.RABBITMQ, q: 'user.deleteAll' }).publisher()
            }, 3000)
            setTimeout(() => {
                // Example publisher
                new Rabbit({ address: process.env.RABBITMQ, q: 'user.create' })
                    .publisher({
                        name: 'User Name',
                        pass: '123456'
                    })

                // Example rpc publisher
                new Rabbit({ callback: (msg) => {
                    console.log('msg => ', msg)
                }, address: process.env.RABBITMQ, q: 'user.get' })
                    .rpcPublisher()
            }, 5000)
        }
    }

    async dropAllUser () {
        await User.deleteMany({}, () => console.log('All user was deleted'))
    }

    async createUser (msg) {
        let obj = new User(msg);
        let res = await obj.save();
        return res;
    }

    async getAllUser (msg) {
        let res = await User.find();
        return res;
    }
}
module.exports = UserQueue;