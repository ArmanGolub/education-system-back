// const db = require("../models");
// const config = require("../config/auth.config");
// const User = db.user;
// const Role = db.role;

// const Op = db.Sequelize.Op;

// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcryptjs");

const AuthService = require('./../services/authService');
const asyncHandler = require('./../middlewares/asyncHandler');
const ApiError = require('../exceptions/apiError');
const UserDto = require('../dtos/userDto');


exports.registration = asyncHandler(async (req, res, next) => {
    const requestUser = req.body;
    const userData = await AuthService.registration(requestUser);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.json({ success: true, data: userData });
})

exports.login = asyncHandler(async (req, res,next) => {
    const requestUser = req.body;
    const userData = await AuthService.login(requestUser);
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return res.json({ success: true, data: userData });
})

exports.logout = asyncHandler(async (req, res, next) => {
    const {refreshToken} = req.cookies;
    const token = await AuthService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return res.json({ success: true, data: token });
})

exports.refresh = asyncHandler(async (req, res, next) => {
    const {refreshToken} = req.cookies;
    const userData = await AuthService.refresh(refreshToken);
    if (!userData) {
        throw new ApiError(401, "invalid refresh")
    }
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return res.json({ success: true, data: userData });
})

exports.me = async (req, res) => {
    const user = await User.findByPk(req.user.id);

    const userData = new UserDto(user)
  
    res.status(200).json({ success: true, data: userData });
  };