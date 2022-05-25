const express = require('express');
Works_controller = require('./../Controllers/WorksControllers');
Auth_controller = require('./../Controllers/AuthControllers');

const router = express.Router();

//Work routes
router
    .route('/')
    .get(Auth_controller.protect,Auth_controller.restrictTo('Admin','Director'),Works_controller.get_works)
    .post(Auth_controller.protect,Auth_controller.restrictTo('Admin','Director','Manager'),Works_controller.post_works);
router
    .route('/:id')
    .get(Auth_controller.protect,Works_controller.get_works_id)
    .patch(Auth_controller.protect,Auth_controller.restrictTo('Director','Admin','Manager','Team-leader'),Works_controller.works_patch)
    .delete(Auth_controller.protect,Auth_controller.restrictTo('Admin','Director','Manager'),Works_controller.works_delete);

module.exports = router;