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


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;
