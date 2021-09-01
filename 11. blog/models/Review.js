const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({

     user:{
        type:Schema.Types.ObjectId,
        ref: 'users'
    },

    body:{
        type: String,
        required: true
    },

    date:{
        type: Date,
        default: Date.now()
    },
    
    approveReview:{
        type:Boolean
    }
  
});

module.exports = mongoose.model('reviews', ReviewSchema);