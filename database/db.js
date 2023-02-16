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

// ================================================= //

const neo4j = require("neo4j-driver")

const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic(`${process.env.NEO_USER}`,`${process.env.NEO_PASS}`));

module.exports = { main, driver }