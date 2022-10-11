const User = require("../models/User");
const { validationResult } = require("express-validator");
const createJwtToken = require("../utils/createJwtToken");
const generatePasswordHash = require("../utils/generatePasswordHash");
const bcrypt = require("bcrypt");

class UserController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    message: "Такой пользователь не существует"
                });
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({
                    message: "Данные неверны"
                });
            }

            const token = createJwtToken(user);

            return res.json({ token });
        } catch (error) {
            return res.status(400).json({
                message: "Ошибка авторизации"
            })
        }

    }

    async registration(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const errorInfo = {};

                errors.errors?.forEach((error) => {
                    errorInfo[error.param] = error.msg;
                })
                return res.status(400).json({ message: errorInfo });
            }

            const {
                email,
                password,
                first_name,
                last_name,
                surname,
                role,
                educationFormKz,
                educationFormRu,
                educationFormEn,
                educationCode
            } = req.body;

            const isUserExist = await User.findOne({ email });

            if (isUserExist) {
                return res.status(400).json({ message: "Пользователь с таким логином уже существует" });
            }

            const hashPassword = generatePasswordHash(password);

            const user = new User({
                email,
                password: hashPassword,
                first_name,
                last_name,
                surname,
                role,
                educationCode,
                educationFormRu,
                educationFormEn,
                educationFormKz
            });
            await user.save();
            return res.json({ message: "Пользователь успешно создан" });
        } catch (e) {
            res.status(500).json({
                message: "Произошла какая та ошибка" + e
            });
        }
    }

    async getUsers(req, res){
        try{
            const users = await User.find()

            return res.json({
                message: "Запрос успешно отработан",
                users
            })
        }catch(e){
            res.status(500).json({
                message: "Произошла какая та ошибка" + e
            });
        }
    }
};

module.exports = new UserController();
