const express = require('express');
const viewsController = require('../controllers/ViewsController');
const authController = require('../controllers/AuthControllers');

const router = express.Router();



router.get('/',viewsController.home);
router.get('/home',viewsController.home);
router.get('/projects',authController.protect,viewsController.projects);
router.get('/project/:slug/dashboard',authController.protect,viewsController.project);
router.get('/users',authController.protect,viewsController.users);
router.get('/services',viewsController.services);
router.get('/register',viewsController.register);
router.get('/project/:slug/members',authController.protect,viewsController.members);
router.get('/login',viewsController.login,authController.protect,viewsController.projects);
module.exports = router;