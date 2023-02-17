const Post = require("../model/Note")
const User = require("../model/User")
const { driver } = require("../database/db")

const UserPost = async (post, user) => {
    const session = driver.session()
    try {
        await session.run(
            'create (p:Post{id: $id}) return p, id(p)',
            {id: post}
        )
        await session.run(
            `match (p:Post{id: $postId})
            match (u:User{id: $userId})
            create (u)-[pt:postou]->(p)`,
            {postId: post, userId: user}
        )
    } catch (error) {
        console.log(`Erro: ${error}`)
    } finally {
        await session.close()
    }
}

const mynotes = async (req, res) =>{
    try {
        const post = await Post.find()
        res.render("../page/index.ejs", {post: post})
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

const createPost = async (req, res) =>{
    const dados = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
    }
    if(!dados.titulo || !dados.conteudo){
        return res.redirect('/mynotes')
    }
    try {
        const post = await Post.create(dados)

        const userId = req.session.user
        UserPost(post._id.toString(), userId.id.toString())
        
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

const UserPostDelete = async (user, post) => {
    const session = driver.session()
    try {
        await session.run(
            `match(p:Post{id: $postId}) detach delete p`,
            {postId: post}
        )
    } catch (error) {
        console.log(`Erro: ${error}`)
    } finally {
        await session.close()
    }
}

const deletePost = async (req, res) =>{
    const userId = req.session.user
    const id = req.params.id
    try {
        UserPostDelete(userId.id.toString(), id.toString())
        await Post.findByIdAndDelete(id)

        res.redirect('/mynotes')
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = { mynotes, createPost, readPost, updatePost, deletePost}