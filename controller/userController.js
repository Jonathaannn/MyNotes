const User = require("../model/User")

const login = (req, res) => {
    try {
        res.render('../page/login.ejs')
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = { login }