const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Members Only',
        user: req.user,
    });
});

module.exports = router;
