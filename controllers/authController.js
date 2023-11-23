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


exports.registration = asyncHandler(async (req, res, next) => {
    const requestUser = req.body;
    const userData = await AuthService.registration(requestUser);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.json(userData);
})

exports.login = asyncHandler(async (req, res,next) => {
    const requestUser = req.body;
    const userData = await AuthService.login(requestUser);
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return res.json(userData);
})

exports.logout = asyncHandler(async (req, res, next) => {
    const {refreshToken} = req.cookies;
    const token = await AuthService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return res.json(token);
})

exports.refresh = asyncHandler(async (req, res, next) => {
    const {refreshToken} = req.cookies;
    const userData = await AuthService.refresh(refreshToken);
    if (!userData) {
        throw new ApiError(401, "invalid refresh")
    }
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return res.json(userData);
})