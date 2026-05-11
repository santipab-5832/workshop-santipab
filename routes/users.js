var express = require('express');
var router = express.Router();
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { verifyToken, isAdmin } = require('../middleware/token.middleware');
const userController = require('../controller/user.controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, './public/images')
  },
  filename: function (req, file, cb){
    cb(null, new Date().getTime() + "_" + file.originalname)
  }
})

const upload = multer({ storage: storage })


// จัดการข้อมูลผู้ใช้ CRUD
/* GET users listing. */
router.get('/', verifyToken, userController.listUser);

/* GET users ผ่าน ID */
router.get('/:id', verifyToken, userController.listUserById);

router.post('/', [verifyToken, isAdmin], userController.addUser);

// router.post('/', [tokenMiddleware, upload.single('image')], async function(req, res, next) {
//   let { name, age, password } = req.body;

//   let user = new userSchema({
//     name: name,
//     age: age,
//     password: await bcrypt.hash(password, 10)
//   })

//   let token = await jwt.sign({ foo: "bar" }, "1234")

//   // await user.save();
//   // res.send("insert success!");
//   res.send(token);
// });

router.put('/:id', verifyToken, userController.editUser);

router.patch('/:id', verifyToken, userController.patchUser);

router.delete('/:id', [verifyToken, isAdmin], userController.deleteUser);

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/:id/approve', [verifyToken, isAdmin], userController.approveUser)


module.exports = router;
