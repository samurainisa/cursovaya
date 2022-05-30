const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BuildingsSchema = new Schema({
    name: {
        type: String,
    },
    cover: {
        type: String,
    },
    buildType: {
        type: String,
    },
    limit: {
        type: Number,
    },
    comps: [{
        name: {
            type: String,
        },
        winPlace: {
            type: Number,
        },
        emp: [{
            ref: 'emps',
            type: mongoose.Schema.Types.ObjectId,
        }],
        startDate: {
            type: Date
        },
        orgs: [{
            name: {
                type: String,
            }
        }]
    }]
})
module.exports = mongoose.model('builds', BuildingsSchema)