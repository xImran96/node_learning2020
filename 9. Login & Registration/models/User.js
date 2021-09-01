const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

        email:{
            type: String,
            unique: true,
            required: true,
            trim: true,
            minlength: 3

        },

        password:{
            type: String,
            required: true,
            minlength: 3
        }
});

module.exports = mongoose.model('users', UserSchema);

