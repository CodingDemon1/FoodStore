const { UserModel } = require("../Models/User.Models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRegister = async (req, res) => {
	try {
		const { name, email, password, street, city, state, country, zip } =
			req.body;

		// const newUser = {
		// 	name,
		// 	email,
		// 	password,
		// 	address: {
		// 		street,
		// 		city,
		// 		state,
		// 		country,
		// 		zip,
		// 	},
		// };

		const isUserExist = await UserModel.findOne({ email });

		if (isUserExist)
			return res.status(400).json({ msg: "User Already exists" });

		const hashedPassword = bcrypt.hashSync(password, 6);

		const user = new UserModel({
			name,
			email,
			password: hashedPassword,
			address: {
				street,
				city,
				state,
				country,
				zip,
			},
		});

		await user.save();

		res.status(201).json({ msg: "User Created Successfully." });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const UserLogin = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email });

		// checking if user exist or not
		if (!user) {
			return res.status(404).json({ msg: "User Not Exists" });
		}

		//Checking if the password is correct or not
		const isPassOk = await bcrypt.compare(password, user.password);

		if (!isPassOk) {
			return res.statu(400).send({ msg: "Invalid Email or Password" });
		}

		const token = jwt.sign({ userID: user._id }, process.env.SECRET, {
			expiresIn: "1h",
		});

		res.status(201).json({ msg: "LoginSucessfull", token });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

// Password Reset
const UserResetPassword = async (req, res) => {
	const id = req.params.id;
	const { password } = req.body;
	const hashedPassword = bcrypt.hashSync(password, 6);
	try {
		await UserModel.findByIdAndUpdate(id, { password: hashedPassword });
		console.log("Password Updated");
		res.status(204).send("Password Updated");
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

module.exports = { UserRegister, UserLogin, UserResetPassword };
