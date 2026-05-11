var userSchema = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
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

exports.approveUser = async function (req, res, next) {
    try {
        let { id } = req.params;

        let user = await userSchema.findByIdAndUpdate(id, { isApproved: true }, { new: true });

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).send("User approved!");
    } catch (error) {
        res.status(500).send("Failed to approve");
    }
}

exports.listUser = async function(req, res, next) {
    try{
        let user = await userSchema.find({});
        res.status(200).send(user)
    } catch(error){
        res.status(500).send("Error");
    }
};

exports.listUserById = async function (req, res, next) {
    try{
        let { id } = req.params;
        let user = await userSchema.findById(id);
        res.send(user)
    } catch(error){
        res.status(500).send("Error")
    }
};

exports.addUser = async function (req, res, next) {
    try{
        let { username, password } = req.body;

        let user = new userSchema({
            username,
            password: await bcrypt.hash(password, 10),
            isApproved: true // default, wait for admin
        });

        await user.save();
        res.status(201).send("Created")
    } catch(error){
        res.status(500).send("Faild Created")
    }
};

exports.editUser = async function (req, res, next) {
    try{
        let { username, password } = req.body
        let { id } = req.params

        let user = await userSchema.findByIdAndUpdate(id, { username, password }, { new: true })

        res.status(200).send(user)
    } catch(error){
        res.status(500).send("Failed to edit")
    }
};

exports.patchUser = async function (req, res, next) {
    try{
        let { id } = req.params
        let updates = req.body

        let user = await userSchema.findByIdAndUpdate(id, { $set: updates }, { new: true })
        res.status(200).send(user)

    } catch(error){
        res.status(500).send("Patch Failed")
    }
};

exports.deleteUser = async function (req, res, next) {
    try{
        let { id } = req.params

        let user = await userSchema.findByIdAndDelete(id)
        res.status(204).send("Deleted")
    } catch(error){
        res.status(500).send("Delete Failed")
    }
};