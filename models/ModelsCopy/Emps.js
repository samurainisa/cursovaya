const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmpsSchema = new Schema({
    firstName: String,
    lastName: String,
    startDate: Date,
    sport: [{category: String, name: String,}],
    tren: [{
        nameOne: String,
        secondName: String,
        sportTren: String,
        startDate: Date,
        salary: {type: Number, default: 50000}
    }]
})
module.exports = mongoose.model('emps', EmpsSchema)