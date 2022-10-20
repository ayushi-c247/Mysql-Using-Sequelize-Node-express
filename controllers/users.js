const jwt = require('jsonwebtoken');

const { message } = require("../common/message");
const db = require("../models");
const { encryptPassword, comparePassword } = require("../common/password")

const User = db.users;

/**
 * Signup API
 */
const signup = async (req, res) => {
    try {
        const {
            body: { email, password },
        } = req;
        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(409).json({
                message: message.EMAIL_ALREADY_EXIST,
            });
        }
        const hashedPassword = await encryptPassword(password);
        const createdUser = await User.create({
            email,
            password: hashedPassword
        });
        return res.status(200).json({ message: message.SIGNUP_SUCCESSFULLY, data: createdUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
}

/**
 * Login API
 */
const login = async (req, res) => {
    try {
        const {
            body: { email, password },
        } = req;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                message: message.EMAIL_PASSWORD_NOT_MATCH,
            });
        }
        const isPasswordMatched = await comparePassword(
            password,
            user.dataValues.password
        );
        if (!isPasswordMatched) {
            return res.status(400).json({
                message: message.EMAIL_PASSWORD_NOT_MATCH,
            });
        }
        const access = {
            id: user.email,
        };
        const token = jwt.sign(access, process.env.JWT_SECRET, {
            expiresIn: 86400
        });
        return res.status(200).json({ message: message.LOGIN_SUCCESSFULLY, token: token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
        });
    }
}

const UserController = {
    login, signup
}
module.exports = UserController
