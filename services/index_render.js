exports.render = (req, res, next) => {
    res.render('index', {
        title: 'Members Only',
        user: req.user,
    });
}
