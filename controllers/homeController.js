module.exports = {
    get: {
        home(req, res) {
            res.render('home', { page: 'Home', title: 'Hello' });
        },
    },
    post: {
        color(req, res) {
            res.redirect(req.get('referer'));
        }
    }
}