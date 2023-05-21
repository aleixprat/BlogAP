const router = require('express').Router();
const dayjs = require('dayjs');

const {create, getById, getAll, getPostsByAutor, update, deletePost} = require('../../models/post.model');

//Creación de un post
router.post('/', async (req,res) => {
    try {
        req.body.fecha_creacion = dayjs().format("YYYY-MM-DD"); 
        console.log(req.body);

        const [result] = await create(req.body);
        const [[postRecuperado]] = await getById(result.insertId);
        res.json(postRecuperado);
    } catch(err) {
        res.status(500).json({ fatal: err.message })
    }
});

//Recuperar un post por su ID
router.get('/:postId', async (req,res) => {
    const postId = req.params.postId;

    try {
        const [[postRecuperado]] = await getById(postId);
        if (!postRecuperado) {
           return res.json({
            fatal: `No existe el post con el id ${postId}`
           });
        }

        res.json(postRecuperado);

    } catch(err) {
        res.status(500).json({ fatal: err.message })
    }
});

//Recuperar todos los posts
router.get('/', async (req,res) => {

    try {
        const [postsRecuperados] = await getAll();
        if (!postsRecuperados || postsRecuperados.length == 0) {
           return res.json({
            fatal: `No existen posts`
           });
        }

        res.json(postsRecuperados);

    } catch(err) {
        res.status(500).json({ fatal: err.message })
    }
});

//Recuperar todos los posts de un autor
router.get('/getByAutor/:autorId', async (req,res) => {
    const autorId = req.params.autorId;

    try {
        const [postsRecuperados] = await getPostsByAutor(autorId);
        if (!postsRecuperados || postsRecuperados.length == 0) {
           return res.json({
            fatal: `No existen posts con el autor con el id ${autorId}`
           });
        }

        res.json(postsRecuperados);

    } catch(err) {
        res.status(500).json({ fatal: err.message })
    }
});

//Actualziar un post
router.put('/:postId', async (req, res) => {
    const postId = req.params.postId;

    try {
        await update(postId, req.body);
        const [postActualizado] = await getById(postId);
        if (!postActualizado || postActualizado.length == 0) {
            return res.json({
                fatal: `El post con el id ${postId} no existe`
            });
        }
        res.json(postActualizado[0]);
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
});

//Borrar un post
router.delete('/:postId', async (req, res) => {
    const postId = req.params.postId;

    try {
        const [post] = await getById(postId);
        if (!post || post.length == 0) {
            return res.json({
                fatal: `El post con el id ${postId} no existe`
            });
        }
        await deletePost(postId);
        res.json(post[0]);
    } catch (err) {
        res.status(500).json({ fatal: err.message })
    }
});

module.exports = router;
