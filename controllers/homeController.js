module.exports = {
    get: {
        home(req, res) {
            res.render('home', { page: 'Home', title: 'Hello' });
        }
    }
}