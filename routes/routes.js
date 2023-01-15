const { Router } = require("express")
const routes = Router()
const controller = require("../controller/postController")

routes.get('/', controller.start)
routes.get('/mynotes', controller.mynotes)
routes.post('/mynotes/criar', controller.createPost)
routes.get('/mynotes/buscar/:text', controller.readPost)
routes.put('/mynotes/editar/:id', controller.updatePost)
routes.delete('/mynotes/excluir/:id', controller.deletePost)

module.exports = routes