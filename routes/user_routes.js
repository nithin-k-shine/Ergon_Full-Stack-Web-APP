const express = require('express');
User_controller = require(`./../Controllers/UserControllers`);
Auth_Controller = require(`./../Controllers/AuthControllers`);

const router = express.Router();

router.route('/signup').post(Auth_Controller.signup);
router.route('/login').post(Auth_Controller.login);
router.route('/logout').get(Auth_Controller.logout);

router
    .route('/')
    .get(Auth_controller.protect,Auth_controller.restrictTo('Admin','Director','Manager'),User_controller.get_users)
    .post(Auth_controller.protect,Auth_controller.restrictTo('Admin','Director','Manager'),User_controller.create_user);
router
    .route('/:id')
    .get(Auth_controller.protect,User_controller.get_user)
    .patch(Auth_controller.protect,Auth_controller.restrictTo('Admin','Director','Manager','Team-Leader'),User_controller.update_user)
    .delete(Auth_controller.protect,Auth_controller.restrictTo('Admin','Director','Manager'),User_controller.delete_user);

module.exports = router;