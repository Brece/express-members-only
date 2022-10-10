const Image = require('../models/ImageModel');

exports.image_create_get = (req, res, next) => {
    res.render('image_form', {
        title: 'Image Upload',
        user: req.user,
        errors: false,
    });
}

exports.image_create_post = (req, res, next) => {
    // remove file extension from image name
    const originalname = req.file.originalname;
    const name = originalname.substr(0, originalname.lastIndexOf('.')) || originalname;

    const image = new Image({
        file: {
            name: name,
            size: req.file.size,
            data: req.file.buffer,
            contentType: req.file.mimetype,
        }
    });

    image.save((err) => {
        if (err) {
            return next(err);
        }

        res.redirect('/user/image/create');
    });
}
