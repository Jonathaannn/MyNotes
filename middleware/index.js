const checkSession = (req, res, next) => {
    const cookie = req.session.user
    if (!cookie) {
        return res.redirect('/mynotes/login')
    }
    next()
}
module.exports = checkSession