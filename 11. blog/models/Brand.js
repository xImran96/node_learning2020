const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name:{
        type:String,
        required: true
    },

    category:{
        type:Schema.Types.ObjectId,
        ref: 'categories'
    },
    
    status:{
        type:Number,
        required: true
    },

    logo:{
        type:String,
        required: true
    }
    
});

module.exports = mongoose.model('brands', brandSchema);