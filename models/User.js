const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
        type: String,
        enum: ['administrator', 'user'],
        default: ['user']
    }],
    themeColor: {
        type: String,
        default: 'light'
    }
});

module.exports = mongoose.model('User', UserSchema);