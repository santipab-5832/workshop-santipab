var userSchema = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

exports.approveUser = async function (req, res, next) {
  try {
    let { id } = req.params;

    let user = await userSchema.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true },
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json({
      status: 200,
      message: "User Approved!",
      data: user,
    });
  } catch (error) {
    res.status(500).send("Failed to approve");
  }
};

exports.listUser = async function (req, res, next) {
  try {
    let user = await userSchema.find({});
    res.status(200).json({
      status: 200,
      message: "succecc!",
      data: user,
    });
  } catch (error) {
    res.status(500).send("Error");
  }
};

exports.listUserById = async function (req, res, next) {
  try {
    let { id } = req.params;
    let user = await userSchema.findById(id);
    res.status(200).json({
      status: 200,
      message: "succecc!",
      data: user,
    });
  } catch (error) {
    res.status(500).send("Error");
  }
};

exports.addUser = async function (req, res, next) {
  try {
    let { username, password } = req.body;

    let user = new userSchema({
      username,
      password: await bcrypt.hash(password, 10),
      isApproved: true, // default, wait for admin
    });

    await user.save();
    res.status(201).json({
      status: 201,
      message: "Created User!",
      data: user,
    });
  } catch (error) {
    res.status(500).send("Faild Created");
  }
};

exports.editUser = async function (req, res, next) {
  try {
    let { username, password } = req.body;
    let { id } = req.params;

    let user = await userSchema.findByIdAndUpdate(
      id,
      { username, password },
      { new: true },
    );

    res.status(200).json({
      status: 200,
      message: "Edited user",
      data: user,
    });
  } catch (error) {
    res.status(500).send("Failed to edit");
  }
};

exports.patchUser = async function (req, res, next) {
  try {
    let { id } = req.params;
    let updates = req.body;

    let user = await userSchema.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true },
    );
    res.status(200).json({
      status: 200,
      message: "Edited user",
      data: user,
    });
  } catch (error) {
    res.status(500).send("Patch Failed");
  }
};

exports.deleteUser = async function (req, res, next) {
  try {
    let { id } = req.params;

    let user = await userSchema.findByIdAndDelete(id);
    res.status(204).json({
      status: 204,
      message: "Deleted User",
      data: user,
    });
  } catch (error) {
    res.status(500).send("Delete Failed");
  }
};
