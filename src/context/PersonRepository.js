const Person = require("../models/Person")
const Base = require("./Base")
module.exports = class PersonRepository extends Base {
    constructor () {
        super(Person)
    }
}