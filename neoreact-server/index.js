require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const jwtMiddleware = require('./src/lib/jwtMW');
const cookieParser = require('cookie-parser');

const { PORT, MONGO_URI, USER, PASS, DB_NAME } = process.env;

const http = require('http').createServer(app);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'neoreact/build')));

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4,
            user: USER,
            pass: PASS,
            dbName: DB_NAME,
            useFindAndModify: false,
            keepAlive: true,
            bufferMaxEntries: 0,
        });

        console.log('몽고DB 접속완료');
    } catch (e) {
        console.dir(e, { depth: 4 });
    }
};

connectDB();
app.use(jwtMiddleware.jwtmw);
app.use(jwtMiddleware.checkSession);
const posts = require('./src/routes/posts');
const users = require('./src/routes/users');

app.use('/posts', posts);
app.use('/users', users);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'neoreact/build/index.html'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'neoreact/build/index.html'));
});

http.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
