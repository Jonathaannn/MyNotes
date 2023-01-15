const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    titulo:{
        type: String,
        index: true,
    },
    conteudo: {
        type: String,
        index: true,
    }
})

postSchema.index({
    titulo: "text", conteudo: "text"
},{
    weights:{
        titulo: 2, conteudo: 1
    },
    name:"IndexPost"
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post