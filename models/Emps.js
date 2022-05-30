const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmpsSchema = new Schema({
        club_name: {
            type: String,
        },
        date_start: {
            type: Date,
        },
        emps: [{
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            startDate: {
                type: Date,
            },
            sport: [{
                category: {
                    type: String,
                },
                name: {
                    type: String,
                }
            }],
            tren: [{
                nameOne: {
                    type: String,
                },
                secondName: {
                    type: String,
                },
                sportTren: {
                    sportName: String
                },
                startDate: {
                    type: Date,
                },
                salary: {
                    type: Number,
                    default: 50000
                }
            }],
        }],
})
module.exports = mongoose.model('emps', EmpsSchema)