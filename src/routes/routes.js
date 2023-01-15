const { Router } = require("express")
const routes = Router()
const controller = require("../controller/postController")

routes.get('/', controller.start)
routes.get('/mynotes', controller.mynotes)
routes.post('/mynotes/criar', controller.create)
routes.get('/mynotes/busca/:texto', controller.read)
routes.delete('/mynotes/excluir/:id', controller.delete)
routes.put('/mynotes/editar/:id', controller.update)
module.exports = routes