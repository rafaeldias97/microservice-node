const amqp = require('amqplib/callback_api');
let _self = null
module.exports = class RabbitMQ {
    constructor({ callback, address = 'amqp://guest:guest@w3rabbit:5672', q, durable = true }) {
        this.callback = callback;
        this.address = address;
        this.q = q;
        this.durable = durable;
        _self = this;
    }
    rpcRabbit() {
        amqp.connect(_self.address, (error0, conn) => {
            if (error0) throw error0;
            conn.createChannel(async (error1, ch) => {
                if (error1) throw error1;
                console.log(`Escutando Fila ${_self.q}`);
                ch.assertQueue(_self.q, { durable: _self.durable });
                ch.prefetch(1);
                ch.consume(_self.q, async function reply(msg) {
                    let res = this.callback(JSON.parse(msg.content.toString()));
                    ch.sendToQueue(msg.properties.replyTo,
                        new Buffer(JSON.stringify(res)),
                        { correlationId: msg.properties.correlationId });
                    ch.ack(msg);
                });
            });
        });
    }

    publisher(msg) {
        amqp.connect(_self.address, (error0, conn) => {
            if (error0) throw error0;
            conn.createChannel((err, ch) => {
                if (err != null) bail(err);
                ch.assertQueue(_self.q);
                console.log(" [x] Sent %s", JSON.stringify(msg));
                ch.sendToQueue(_self.q, Buffer.from(JSON.stringify(msg)));
            });
        });
    }

    consumer() {
        amqp.connect(_self.address, (error0, conn) => {
            if (error0) throw error0;
            conn.createChannel(async (err, ch) => {
                if (err != null) bail(err);
                ch.assertQueue(_self.q);
                ch.consume(_self.q, (msg) => {
                    if (msg !== null) {
                        this.callback(JSON.parse(msg.content.toString()));
                        console.log(JSON.parse(msg.content.toString()));
                        ch.ack(msg);
                    }
                });
            });
        });
    }
}