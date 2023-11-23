const db = require('../models');
const bcrypt = require('bcrypt');
const tokenService = require('./tokenService');
const ApiError = require('./../exceptions/apiError')
const UserDto = require('../dtos/userDto');

class AuthService {
    async registration(requestUser) {
        const candidate = await db.User.findOne({ where: { email: requestUser.email } });
        if (candidate) {
            throw ApiError.BadRequest(`This address is already in use - ${requestUser.email}`)
        }
        const hashPassword = await bcrypt.hash(requestUser.password, 3);
        
        const user = await db.User.create({
            name: requestUser.name,
            email: requestUser.email,
            password: hashPassword, 
            role: requestUser.role
        })
        console.log(user.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }


    async login(requestUser) {
        const user = await db.User.findOne({ where: { email: requestUser.email } });
        if (!user) {
            throw ApiError.BadRequest('User not found')
        }
        const isPassEquals = await bcrypt.compare(requestUser.password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('incorrect password');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            return null
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            return null 
        }
        const user = await db.User.findByPk(userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }
}

module.exports = new AuthService();