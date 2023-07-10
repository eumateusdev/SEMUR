const { Router } = require("express");
const UsersController = require("../controllers/UsersController")

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);
usersRoutes.post("/login", usersController.login);
usersRoutes.post("/createAttraction", usersController.createAttraction);
usersRoutes.post("/getAttractionByNameAndType", usersController.getAttractionByNameAndType);
usersRoutes.post("/getAttractionById", usersController.getAttractionById);
usersRoutes.post("/getAllAttraction", usersController.getAllAttractionsByType);
usersRoutes.post("/removeAttractionById", usersController.removeAttractionById);
usersRoutes.post("/editAttractionById", usersController.editAttractionById);

module.exports = usersRoutes;