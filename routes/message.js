const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 300000,
	}
});

// TODO:
// import controller modules
const user_controller = require('../controllers/userController');
const image_controller = require('../controllers/imageController');
const message_controller = require('../controllers/messageController');
const status_controller = require('../controllers/statusController');

// rendering services
const index = require('../services/index_render');
const login = require('../services/login_render');
const logout = require('../services/logout_render');
const signup = require('../services/signup_render');

router.get('/', index.render);
router.get('/log-in', login.render);
router.get('/log-out', logout.render);
router.get('/sign-up', signup.render);

// API
// Image
router.get('/api/image/create', image_controller.image_create_get);
router.post('/api/image/create', upload.single('image'),image_controller.image_create_post);

// User
router.get('/api/user/sign-up', user_controller.user_create_get);
router.post('/api/user/sign-up', user_controller.user_create_post);
router.post('/api/user/log-in', user_controller.user_login_post);


// Status
router.get('/api/status/:id', status_controller.status_update_get);
router.post('/api/status/:id', status_controller.status_update_post);

module.exports = router;
