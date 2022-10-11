const Router = require("express");
const userController = require("../controllers/User");
const signInValidation = require("../validations/login");
const signUpValidation = require("../validations/registration");

const router = Router();

router.get('/', userController.getUsers)
router.post("/signin", signInValidation, userController.login);
router.post("/signup", signUpValidation, userController.registration);
module.exports = router;
