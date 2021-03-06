const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   
    category:{
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },

  
    title:{
        type:String,
        required: true
    },


    status:{
        type:String,
        default: 'Public'
    },
    
    allowComments:{
        type:Boolean,
        require: true    
    },

    body:{
        type: String,
        require: true
    },

    file:{
        type: String
    },

    date:{
        type: Date,
        default: Date.now()

    },

    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }]

});



module.exports = mongoose.model('posts', PostSchema);