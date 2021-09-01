const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	
	firstName: {
		type: String,
		required: true,
		minLength: 6,
		trim: true
	},

	lastName: {
		type: String,
		required: true,
		minLength: 6,
		trim: true
	},

	isActive: {
		type: Number,
		default: 0
	}

});

module.exports = mongoose.model('users', userSchema);



// const User = mongoose.model('users', {

// 	firstName: {
// 		type: String,
// 		required: true,
// 		minLength: 6,
// 		trim: true
// 	},

// 	lastName: {
// 		type: String,
// 		required: true,
// 		minLength: 6,
// 		trim: true
// 	},

// 	isActive: {
// 		type: Number,
// 		default: 0
// 	}

// });

// module.exports = User;