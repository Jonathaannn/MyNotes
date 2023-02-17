const { driver } = require("../database/db")
const User = require("../model/User")

const login = (req, res) => {
    try {
        res.render('../page/login.ejs')
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

const signup = async (req, res) => {

    const dados = { nome, email } = req.body

    const userExist = await User.findOne({email: dados.email})

    if(userExist){
        req.session.user = {id:userExist._id, email: userExist.email}
        return res.redirect('/mynotes/')
    }
    try {
        const newUser = await User.create(dados)

        const session = driver.session()
        await session.run(
            'create (u:User{id: $id}) return u, id(u)',
            {id: newUser._id.toString()}
        )
        await session.close()

        req.session.user = {id:newUser._id, email: newUser.email}
        res.status(201).redirect('/mynotes/')
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = { login, signup }