const mongoose = require("mongoose");

const ResturentSchema = mongoose.Schema({
	name: String,
	address: {
		street: String,
		city: String,
		state: String,
		country: String,
		zip: String,
	},
	menu: [],
});

const ResturentModel = mongoose.model("Resturent", ResturentSchema);

module.exports = { ResturentModel };
