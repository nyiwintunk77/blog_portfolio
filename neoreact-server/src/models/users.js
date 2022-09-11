const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: String,
    hashedPW: String,
    email: String,
    phone: String,
    createDate: {
        type: Date,
        default: Date.now,
    },
});

// 암호화
UserSchema.methods.setPassword = async function (password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPW = hash;
};

//확인
UserSchema.methods.checkPassword = async function (password) {
    const result = await bcrypt.compare(password, this.hashedPW);
    return result;
};

UserSchema.statics.findByUsername = function (username) {
    return this.findOne({ username });
};

UserSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this.id, username: this.username }, process.env.JWT_KEY, {
        expiresIn: '7d',
    });

    return token;
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPW;
  delete data.email;
  delete data.phone;
  return data;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
