const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	name:{
		type: String,
		required: true
	},
	
	price:{
		type: Number,
		required: true
	},
	
	brand:{
		type: String,
		required: true
	},

	about:{
		type: String,
		required: true
	}
	

},{
	timestamps: true,
	strict: 'throw'
});



module.exports = mongoose.model('products', ProductSchema);