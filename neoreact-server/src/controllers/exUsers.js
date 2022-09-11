const User = require('../models/users');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.clientID);

exports.exLogin = async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.clientID,
        });

        const { name, email, picture } = ticket.getPayload();

        const user = await User.find({ email: email });

        if (user) {
            const data = user.serialize();
            req.session.username = user.username;
            res.status(201).json({ data });
        } else {
            const newUser = new User({
                username: name,
                email,
                phone: '',
            });

            await newUser.save();

            res.cookie('access_token', token, {
                maxAge: 1000 * 60 * 60,
                httpOnly: true,
            });

            const data = newUser.serialize();
            req.session.username = newUser.username;
            res.status(201).json({ data });
        }

        
        
    } catch (error) {
        res.status(500).json(error);
    }

    
};
