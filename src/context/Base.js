module.exports = class Base {
    constructor (Model) {     
        this.Model = Model
    }
    
    async Post(model) {
        model.save()
        .then(result => result)
        .catch(error => error);
    }
    
    async Get() {
        this.Model.find()
        .then(result => result)
        .catch(error => error);
    }

    async Put(data) {
        this.Model.findOneAndUpdate({ _id: req.params.id }, data, { new: true })
            .then(result => result)
            .catch(error => error);
    }

    async Delete() {
        this.Model.findOneAndDelete({ _id: req.params.id })
        .then(result => result)
        .catch(error => error);
    }
}
