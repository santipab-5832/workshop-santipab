const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    role: { type: String, default: 'user' },         // 'user' or 'admin'
    isApproved: { type: Boolean, default: false }
}, {
    timestamps: true    // creatAt, updateAt
})

module.exports = mongoose.model('users', userSchema)