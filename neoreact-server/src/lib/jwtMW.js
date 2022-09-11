const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.jwtmw = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next();

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        res.locals.user = { _id: decodedToken._id, username: decodedToken.username };

        const now = Math.floor(Date.now() / 1000);
        if (decodedToken.exp - now < 60 * 30) {
            const user = await User.findById(decodedToken._id);
            const token = user.generateToken();

            res.cookie('access_token', token, {
                maxAge: 1000 * 60 * 30,
                httpOnly: true,
            });
        }
        return next();
    } catch (error) {
        return next();
    }
};

exports.checkLoggedIn = (req, res, next) => {
    if (!res.locals.user) {
        res.status(401);
        return;
    }
    return next();
};

exports.checkSession = async (req, res, next) => {
    try {
        const user = await User.findFirst({ where: { username: req.session.username } });
        req.user = user;
    } catch (error) {
        return next();
    }
    return next();
};
