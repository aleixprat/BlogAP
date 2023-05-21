const router = require('express').Router();
const {create,getById, update,deleteAutor} = require('../../models/autor.model');

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

//Actualizar autor 
router.put('/:autorId', async (req, res) => {
    const autorId = req.params.autorId;

    try {
        await update(autorId, req.body);
        const [autorActualizado] = await getById(autorId);
        res.json(autorActualizado[0]);
    } catch (err) {
        res.status(500).json({ fatal: err.message })
    }
});

//Borrar un autor
router.delete('/:autorId', async (req, res) => {
    const autorId = req.params.autorId;

    try {
        const [autor] = await getById(autorId);
        if (!autor || autor.length == 0) {
            return res.json({
                fatal: `El autor con el id ${autorId} no existe`
            });
        }
        await deleteAutor(autorId);
        res.json(autor[0]);
    } catch (err) {
        res.status(500).json({ fatal: err.message })
    }
});
module.exports = router;