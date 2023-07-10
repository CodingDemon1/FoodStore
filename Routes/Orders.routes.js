const { OrderModel } = require("../Models/Order.model");

const OrderRouter = require("express").Router();
// {
// 	 _id: ObjectId,
// 	 user : { type: ObjectId, ref: 'User' },
// 	 restaurant : { type: ObjectId, ref: 'Restaurant' },
//    items: [{
//      name: String,
//      price: Number,
//      quantity: Number
//    }],
//    totalPrice: Number,
//    deliveryAddress: {
//      street: String,
//      city: String,
//      state: String,
//      country: String,
//      zip: String
//    },
//    status: String // e.g, "placed", "preparing", "on the way", "delivered"
// }
//Place the Order
OrderRouter.post("/", async (req, res) => {
	const { userId, resturentId, items, totalPrice, deliveryAddress } = req.body;

	try {
		const newOrder = new OrderModel({
			user: userId,
			restaurant: resturentId,
			items,
			totalPrice,
			deliveryAddress,
		});
		await newOrder.save();
		res.status(201).json({ msg: "Order Placed" });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
});

//Get the Order by ID
OrderRouter.post("/:id", async (req, res) => {
	const id = req.params.id;

	try {
		const order = await OrderModel.findOne({ _id: id });
		res.status(200).json(order);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
});

//Update the Order by ID
OrderRouter.patch("/:id", async (req, res) => {
	const id = req.params.id;
	const body = req.body;
	try {
		const order = await OrderModel.findByIdAndUpdate(id, body);
		res.status(204).json(order);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
});

module.exports = { OrderRouter };
