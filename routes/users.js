var express = require('express');
var router = express.Router();
var userSchema = require('../models/user.model');
const { Schema } = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenMiddleware = require('../middleware/token.middleware')

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, './public/images')
  },
  filename: function (req, file, cb){
    cb(null, new Date().getTime() + "_" + file.originalname)
  }
})

const upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await userSchema.find({})
  res.send(users);
});

router.post('/', [tokenMiddleware, upload.single('image')], async function(req, res, next) {
  let { name, age, password } = req.body;

  let user = new userSchema({
    name: name,
    age: age,
    password: await bcrypt.hash(password, 10)
  })

  let token = await jwt.sign({ foo: "bar" }, "1234")

  // await user.save();
  // res.send("insert success!");
  res.send(token);
});

router.put('/:id', async function(req, res, next) {
  let { name, age } = req.body;
  let { id } = req.params;

  let user = await userSchema.findByIdAndUpdate(id, { name, age }, { new: true })

  res.send("update success!");
});

router.delete('/:id', async function(req, res, next) {
  let { id } = req.params;

  let user = await userSchema.findByIdAndDelete(id)

  res.send(`${user} Deleted`);
});

module.exports = router;
