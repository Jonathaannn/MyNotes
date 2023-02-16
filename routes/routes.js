const { Router } = require("express")
const routes = Router()
const checkSession = require("../middleware/index")
const postController = require("../controller/postController")
const userController = require("../controller/userController")

routes.get('/', checkSession, postController.mynotes)
routes.post('/criar', postController.createPost)
routes.get('/buscar/:text', postController.readPost)
routes.put('/editar/:id', postController.updatePost)
routes.delete('/excluir/:id', postController.deletePost)

routes.get('/login', userController.login)
routes.post('/signup', userController.signup)

module.exports = routes