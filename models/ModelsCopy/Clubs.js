const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClubSchema = new Schema({
    club_name: String,
    date_start: Date,
    emps: [{
        ref: 'emps',
        type: mongoose.Schema.Types.ObjectId,
    }]
})
module.exports = mongoose.model('clubs', ClubSchema)