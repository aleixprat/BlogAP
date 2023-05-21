const router = require('express').Router();
const {create,getById} = require('../../models/post.model');

//Creación de un post
router.post('/', async (req,res) => {
    try {
        const [result] = await create(req.body);
        const [[postRecuperado]] = await getById(result.insertId);
        res.json(postRecuperado);
    } catch(err) {
        res.status(500).json({ fatal: err.message })
    }
})

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
})

module.exports = router;
