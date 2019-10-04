const User = require('../models/User')
class UserQueue {
    constructor ({ conn, test = false }) {
        if (!test) {
            this.conn = conn;
            this.conn.queue('user.create', { durable: true, autoDelete: false }).subscribe(this.createUser);
        }
    }

    async createUser (msg) {
        let obj = new User(msg);
        let res = await obj.save();
        return res;
    }
}
module.exports = UserQueue;