const addResturent = async (req, res) => {
	try {
		const { name, street, city, state, country, zip } = req.body;

		const newResturent = {
			name,
			address: {
				street,
				city,
				state,
				country,
				zip,
			},
			menu: [],
		};

		const resturent = new ResturentModel(newResturent);
		await resturent.save();
		res.status(200).json({ msg: "resturent Created" });
	} catch (error) {
		res.status(500).json({ msg: error.msg });
	}
};

const listResturent = async (req, res) => {
	try {
		const allResturent = await ResturentModel.find();
		res.status(200).json(allResturent);
	} catch (error) {
		res.status(500).json({ msg: error.msg });
	}
};

const findResturent = async (req, res) => {
	try {
		const id = req.params.id;
		const resturent = await ResturentModel.findById(id);
		res.status(200).json(resturent);
	} catch (error) {
		res.status(500).json({ msg: error.msg });
	}
};

const getMenu = async (req, res) => {
	try {
		const id = req.params.id;
		const resturent = await ResturentModel.findById(id);
		res.status(200).json(resturent.menu);
	} catch (error) {
		res.status(500).json({ msg: error.msg });
	}
};

const deleteMenu = async (req, res) => {
	try {
		// const { name, description, price, image } = req.body;
		const id = req.params.id;
		const menuId = req.params.mId;

		await ResturentModel.updateOne(
			{ _id: id },
			{ $pull: { menu: { $elemMatch: { _id: menuId } } } }
		);

		res.status(201).json({ msg: "Menu Deleted" });
	} catch (error) {
		res.status(500).json({ msg: error.msg });
	}
};

const addMenu = async (req, res) => {
	try {
		const { name, description, price, image } = req.body;
		const id = req.params.id;

		const newMenu = new MenuModel({ name, description, price, image });

		await ResturentModel.updateOne({ _id: id }, { $push: { menu: newMenu } });
		res.status(201).json({ msg: "Menu Added" });
	} catch (error) {
		res.status(500).json({ msg: error.msg });
	}
};

module.exports = {
	addResturent,
	listResturent,
	findResturent,
	getMenu,
	deleteMenu,
	addMenu,
};
