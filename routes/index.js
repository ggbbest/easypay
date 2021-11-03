var express = require('express');
var router = express.Router();
var QRCode = require('qrcode');

const userController = require('../app/controllers/user.controller');
const auth = require('../app/middlewares/auth.middleware');
const Role = require('../app/utils/userRoles.utils');
const awaitHandlerFactory = require('../app/middlewares/awaitHandlerFactory.middleware');
const { createUserSchema, updateUserSchema, validateLogin } = require('../app/middlewares/validators/userValidator.middleware');


/* GET home page. */
// router.get('/', async function(req, res, next) {
//   const msg = "https://easypay.c4ei.net/sAd=assdaasdas&rAd=asadsad&amt=0.0001&tt="+Date.now();
//   const url = await QRCode.toDataURL(msg);
//   res.render('index', { title: 'Express', dataUrl : url});
// });
router.get('/', function(req, res, next) {
  const msg = "https://easypay.c4ei.net/sAd=assdaasdas&rAd=asadsad&amt=0.0001&tt="+Date.now();
  // const url = QRCode.toDataURL(msg);
  QRCode.toDataURL(msg,function(err, url){
    res.render('index', { title: 'Express', dataUrl : url});
  });  
});

router.get('/', auth(), awaitHandlerFactory(userController.getAllUsers)); // localhost:3000/api/v1/users
router.get('/id/:id', auth(), awaitHandlerFactory(userController.getUserById)); // localhost:3000/api/v1/users/id/1
router.get('/username/:username', auth(), awaitHandlerFactory(userController.getUserByuserName)); // localhost:3000/api/v1/users/usersname/julia
router.get('/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser)); // localhost:3000/api/v1/users/whoami
router.post('/', createUserSchema, awaitHandlerFactory(userController.createUser)); // localhost:3000/api/v1/users
router.patch('/id/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/v1/users/id/1


router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/api/v1/users/login



module.exports = router;
