const Post = require("../model/Note")

const mynotes = async (req, res) =>{
    try {
        const post = await Post.find()
        res.render("../page/index.ejs", {post: post})
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

const createPost = async (req, res) =>{
    try {
        const post = {
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
        }
        await Post.create(post)
        res.redirect('/mynotes')
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

const readPost = async (req, res) =>{
    try {
        const texto = req.params.text
        const post = await Post.find({$text:{$search: texto}},{score:{$meta:"textScore"}})
        if (post==false) {
            res.status(404).json({msg:"Post não encontrado!"})
            return
        }
        res.render("../page/index", {post: post})
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

const updatePost = async (req, res) =>{
    try {
        const id = req.params.id
        const post = {
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }
        const postAtualizado = await Post.findByIdAndUpdate(id, post)
        if (!postAtualizado) {
            res.status(404).json({msg:"Post não encontrado!"})
            return
        }
        res.redirect('/mynotes')
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

const deletePost = async (req, res) =>{
    try {
        const id = req.params.id
        await Post.findByIdAndDelete(id)
        res.redirect('/mynotes')
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = { mynotes, createPost, readPost, updatePost, deletePost}