const { Router } = require("express")
const routes = Router()
const checkSession = require("../middleware/index")
const postController = require("../controller/postController")
const userController = require("../controller/userController")

routes.get('/', checkSession, postController.mynotes)
routes.post('/criar', checkSession, postController.createPost)
routes.get('/buscar/:text', checkSession, postController.readPost)
routes.put('/editar/:id', checkSession, postController.updatePost)
routes.delete('/excluir/:id', checkSession, postController.deletePost)

routes.get('/login', userController.login)
routes.post('/signup', userController.signup)
routes.get('/signout', userController.signout)

module.exports = routes