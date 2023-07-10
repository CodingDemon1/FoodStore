const {
	addResturent,
	listResturent,
	findResturent,
	getMenu,
	deleteMenu,
	addMenu,
} = require("../Controllers/Resturent.controller");
const { ResturentModel } = require("../Models/Food.model");
const { MenuModel } = require("../Models/Menu.model");

const ResturentRouter = require("express").Router();

//This endpoint will add a resturent
ResturentRouter.post("/", addResturent);

//This endpoint will return a list of all available restaurants.
ResturentRouter.get("/", listResturent);

//This endpoint will return the details of a specific restaurant identified by its ID.
ResturentRouter.get("/:id", findResturent);

//This endpoint will return the menu of a specific restaurant identified by its ID.
ResturentRouter.get("/:id/menu", getMenu);

//This endpoint should allow the user to add a new item to a specific restaurants menu identified by it id.
ResturentRouter.post("/:id/menu", addMenu);

// This endpoint should allow the user to delete a particular menu item identified by its id from a specific restaurant.
ResturentRouter.delete("/:id/menu/:mId", deleteMenu);
module.exports = { ResturentRouter };
