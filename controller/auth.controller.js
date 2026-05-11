var userSchema = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.register = async function (req, res, next) {
    try {
        let { username, password } = req.body;

        let existUser = await userSchema.findOne({ username: username });
        if (existUser) {
            return res.status(400).send("User already exists");
        }

        let user = new userSchema({
            username,
            password: await bcrypt.hash(password, 10),
            isApproved: false
        });

        await user.save();
        res.status(201).send("Registered! wait for approve");
    } catch (error) {
        res.status(500).send("Failed register");
    }
}

exports.login = async function (req, res, next) {
    try {
        let { username, password } = req.body;

        let user = await userSchema.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "No account, Register first" });
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Wrong Password!" });
        }

        if (!user.isApproved) {
            return res.status(403).json({ message: "Your account still pending to approve" });
        }

        // Generate token
        let token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '1d' });
        res.status(200).send({ token });

    } catch (error) {
        res.status(500).send("Failed login");
    }
}