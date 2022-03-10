module.exports = {
    get: {
        login(req, res) {
            res.render('users/login', { page: 'Вход', themeColor: 'bg-light' });
        },
        register(req, res) {
            res.render('users/register', { page: 'Регистрация', themeColor: 'bg-dark' });
        }
    },
    post: {
        login(req, res) {

        },

        register(req, res) {

        }
    }
}