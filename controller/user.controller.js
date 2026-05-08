var userSchema = require('../models/user.model');
const bcrypt = require('bcrypt');


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
        let { name, age, password } = req.body;

        let user = new userSchema({
            name: name,
            age: age,
            password: await bcrypt.hash(password,10)
        })

        await user.save();
        res.status(201).send("Created")
    } catch(error){
        res.status(500).send("Faild Created")
    }
};

exports.editUser = async function (req, res, next) {
    try{
        let { name, age } = req.body
        let { id } = req.params

        let user = await userSchema.findByIdAndUpdate(id, { name, age }, { new: true })

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