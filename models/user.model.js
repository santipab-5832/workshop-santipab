const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: { type: String },
    age: { type: Number }
}, {
    timestamps: true    // creatAt, updateAt
})

module.exports = mongoose.model('users', userSchema)