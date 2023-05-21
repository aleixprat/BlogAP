const router = require('express').Router();
const {create,getById} = require('../../models/autor.model');

//Creación de un autor
router.post('/', async (req,res) => {
    try {
        const [result] = await create(req.body);
        const [[autorRecuperado]] = await getById(result.insertId);
        res.json(autorRecuperado);
    } catch(err) {
        res.status(500).json({ fatal: err.message })
    }
})

//Recuperar un autor por su ID
router.get('/:autorId', async (req,res) => {
    const autorId = req.params.autorId;

    try {
        const [[autorRecuperado]] = await getById(autorId);
        if (!autorRecuperado) {
           return res.json({
            fatal: `No existe el autor con el id ${autorId}`
           });
        }

        res.json(autorRecuperado);

    } catch(err) {
        res.status(500).json({ fatal: err.message })
    }
})

module.exports = router;