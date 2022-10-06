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
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

// TODO:
// import controller modules
const user_controller = require('../controllers/userController');
const image_controller = require('../controllers/imageController');
const message_controller = require('../controllers/messageController');
const status_controller = require('../controllers/statusController');

// API
// Image
router.get('/image/create', image_controller.image_create_get);
router.post('/image/create', upload.single('image'),image_controller.image_create_post);

// User
router.get('/signup', user_controller.user_signup_get);
router.post('/signup', user_controller.user_signup_post);
router.get('/login', user_controller.user_login_get);
router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/user/login',
}));
router.get('/:id/logout', user_controller.user_logout_get);
router.get('/:id/status', ensureAuthenticated, status_controller.status_update_get);
router.post('/:id/status', status_controller.status_update_post);

router.get('/:id/update', ensureAuthenticated, user_controller.user_update_get);
router.post('/:id/update', ensureAuthenticated, user_controller.user_update_post);
router.get('/:id', ensureAuthenticated, user_controller.user_detail_get);

// Message

module.exports = router;
