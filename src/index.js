const express = require('express');
const app = express();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const users = [{
    name: "Zaphod Beeblebrox",
    password: "42",
    role: "admin",
    email: "zaphod@gmail.com"
}];

dotenv.config();

function generateToken(data) {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

app.use(express.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const token = generateToken({role: user.role, email: user.email, name: user.name});

        res.json({
            accessToken: token
        });
    } else {
        res.send('Username or password incorrect');
    }
});

app.listen(3000, () => {
    console.log('Authentication service started on port 3000');
});

