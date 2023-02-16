const express = require("express")
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const routes = require("./routes/routes")
const path = require("path")
const { main } = require("./database/db")
require("dotenv").config()

const app = express()

// Engine Layout
app.set('view engine', 'ejs')

// Diretório static public
app.use(express.static(path.join(__dirname+'/public')))

// Body-Parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Method-Override
app.use(methodOverride('_method'))

// Banco
main()

// Rotas:
app.use('/mynotes',routes)

// Host Server
app.listen(process.env.S_PORT, ()=>{
    console.log(`Servidor rodando! http://localhost:${process.env.S_PORT}`)
})