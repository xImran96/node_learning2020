const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name:{
        type:String,
        required: true
    },

    category:{
        type:Schema.Types.ObjectId,
        ref: 'categories'
    },

     brand:{
        type:Schema.Types.ObjectId,
        ref: 'brands'
    },

    specs:{
        type:String,
        required: true
    },
    
    price:{
        type:Number,
        required: true
    },

    images:[{
        type:Schema.Types.ObjectId,
        ref: 'images'
    }],

    
    status:{
        type:Number,
        required: true
    }
});

module.exports = mongoose.model('products', ProductSchema);