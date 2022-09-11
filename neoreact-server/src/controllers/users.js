const User = require('../models/users');
const joi = require('joi');
const { JoiPassword } = require('joi-password');
const { ACCESS_TOKEN } = require('../messages/constants');

exports.register = async (req, res) => {
    const { username, password, email, phone } = req.body;

    const schema = joi.object().keys({
        username: joi.string().alphanum().min(4).max(20).required(),
        password: JoiPassword.string().required(),
        email: joi.string().email(),
        phone: joi
            .string()
            .min(10)
            .max(11)
            .pattern(/^[0-9]+$/),
    });

    const result = schema.validate(req.body);

    if (result.error) {
        res.status(400).json({ message: result.error.message });
        return;
    }

    try {
        // 유저 중복 체크 (존재확인)
        const exists = await User.findByUsername(username);
        if (exists) {
            res.status(409).json({ message: '아이디 중복' });
            return;
        }
        const user = new User({
            username,
            email,
            phone,
        });

        // 패스워드 암호화
        await user.setPassword(password);

        // 데이터베이스에 등록
        await user.save();
        console.log(user);

        const token = user.generateToken();
        res.cookie('access_token', token, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
        });

        const data = user.serialize();

        res.status(201).json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(401);
        return;
    }

    try {
        const user = await User.findByUsername(username);
        if (!user) {
            res.status(401).json({ message: '存在しないID' });
            return;
        }

        const result = await user.checkPassword(password);
        if (!result) {
            res.status(401).json({ message: 'パスワードを確認してください！' });
            return;
        }

        const token = user.generateToken();
        res.cookie(ACCESS_TOKEN, token, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
        });

        const data = user.serialize();
        res.json({ data });
    } catch (error) {
        res.status(500);
    }
};

exports.logout = (req, res) => {
    res.cookie(ACCESS_TOKEN);
    res.locals.user = '';
    res.status(200).json('logout');
};

exports.check = (req, res) => {
    const user = res.locals.user;
    if (!user) {
        return res.status(401).json({ message: '유저 정보 취득 실패' });
    }
    res.status(200).json(user);
};

exports.getUserInfo = async (req, res) => {
    const { username, meFlag } = req.query;

    try {
        const user = await User.findByUsername(username);
        const data = user.toJSON();
        if (meFlag === 'false') {
            delete data.email;
            delete data.phone;
        }
        delete data.hashedPW;
        res.status(201).json({ ...data });
    } catch (error) {
        res.status(500);
    }
};

exports.updateUserInfo = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true }).exec();
    
        if (!user) {
            return res.status(404).json({ message: '유저 정보 취득 실패' });
        }

        if(req.body.password){
            await user.setPassword(req.body.password);
            await user.save();
        }

        const data = user.toJSON();
        delete data.hashedPW;
        res.status(201).json({ ...data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
