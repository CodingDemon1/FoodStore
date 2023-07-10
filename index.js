const express = require("express");
const { connection } = require("./config/db");
// const { UserRouter } = require("./Routes/User.routes");
const { ResturentRouter } = require("./Routes/Resturent.Routes");

require("dotenv").config();
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const {
	UserRegister,
	UserLogin,
	UserResetPassword,
} = require("./Controllers/User.controller");
const { OrderRouter } = require("./Routes/Orders.routes");

const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());

// const options = {
// 	definition: {
// 		openapi: "3.0.0",
// 		info: {
// 			title: "Food Service Documentation",
// 			version: "1.0.0",
// 		},
// 		apis: ["./Routes/User.routes.js"],
// 	},
// };

// const swaggerSpecs = swaggerJSdoc(options);
// app.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
//User Resister
app.post("/api/register", UserRegister);
//User Login
app.post("/api/login", UserLogin);
// User Password Reset
app.patch("/api/user/:id/reset", UserResetPassword);

//Resturent Route
app.use("/api/resturent", ResturentRouter);

//Order Route
app.use("/api/orders", OrderRouter);

app.listen(port, async () => {
	try {
		await connection();
		console.log("Connected to DB");
	} catch (error) {
		console.error(error.message);
	}
	console.log(`Listening @ ${port}`);
});
