const express = require("express")
const router = express.Router()
const controller = require("../controller/user");
const taskcontroller = require("../controller/task")
const verifyToken = require("../middleware/verifyToken");


router.get('/',controller.home);



router.get('/signup',controller.userSignup);
router.post('/signup',controller.userSignup);


router.get('/login',controller.userLogin);
router.post('/login',controller.userLogin);

router.get('/user',controller.userProfile)

router.route('/task').get(verifyToken,taskcontroller.getTask)
router.route('/task').post(verifyToken,taskcontroller.newtask)

router.route('/task/complete/:id').post(verifyToken,taskcontroller.completetask);
router.route('/task/delete/:id').post(verifyToken,taskcontroller.deletetask);

router.get('/logout',controller.userLogout);


router.route('/user').get(verifyToken,controller.home);


module.exports = router;