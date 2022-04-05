const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    login,
    signup,
    checkToken
};

function checkToken(req, res) {
    // req.user will always be there for you 
    console.log('req.user', req.user);
    res.json(req.exp);
  }

async function signup(req, res) {
    const user = new User(req.body);
    try {
        await user.save();
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        // Probably a duplicate email
        res.status(400).json(err);
    }
}


async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error();
        res.json(createJWT(user));
    } catch {
        res.status(400).json('Bad Credentials');
    }
}

/*-- Helper Functions --*/

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '30d' }
    );
}