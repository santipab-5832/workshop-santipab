var express = require('express');
var router = express.Router();
var userSchema = require('../models/user.model');
const { Schema } = require('mongoose');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await userSchema.find({})
  res.send(users);
});

router.post('/', async function(req, res, next) {
  let { name, age } = req.body;

  let user = new userSchema({
    name,
    age
  })

  await user.save();
  res.send("insert success!");
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
