const mongoose = require("mongoose")
require("dotenv").config()

async function main() {
    mongoose.set("strictQuery", true)
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@${process.env.MDB_HOST}/?retryWrites=true&w=majority`)
        console.log("Banco Rodando")
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = main