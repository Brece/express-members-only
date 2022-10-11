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

// import controller modules
const user_controller = require('../controllers/userController');
const image_controller = require('../controllers/imageController');
const message_controller = require('../controllers/messageController');
const status_controller = require('../controllers/statusController');

// API
// Image
router.get('/image/create', ensureAuthenticated, image_controller.image_create_get);
router.post('/image/create', ensureAuthenticated, upload.single('image'),image_controller.image_create_post);

// User
router.get('/signup', user_controller.user_signup_get);
router.post('/signup', user_controller.user_signup_post);
router.get('/login', user_controller.user_login_get);
router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/user/login',
	failureMessage: true,
}));
router.get('/:id/logout', ensureAuthenticated, user_controller.user_logout_get);
router.get('/:id/status', ensureAuthenticated, status_controller.status_update_get);
router.post('/:id/status', ensureAuthenticated, status_controller.status_update_post);
router.get('/:id/admin', ensureAuthenticated, status_controller.admin_update_get);
router.post('/:id/admin', ensureAuthenticated, status_controller.admin_update_post);

router.get('/:id/update', ensureAuthenticated, user_controller.user_update_get);
router.post('/:id/update', ensureAuthenticated, user_controller.user_update_post);
router.get('/:id/delete', ensureAuthenticated, user_controller.user_delete_get);
router.post('/:id/delete', ensureAuthenticated, user_controller.user_delete_post);
router.get('/:id', ensureAuthenticated, user_controller.user_detail_get);

// Message
router.post('/create-message', ensureAuthenticated, message_controller.message_create_post);
router.post('/:id/delete-message', ensureAuthenticated, message_controller.message_delete_post);

module.exports = router;
