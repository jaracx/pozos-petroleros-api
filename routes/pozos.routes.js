const express = require('express');
const router = express.Router();
const { conectarDB } = require('../src/mongodb');

// GET /api/pozos - Obtener todos los pozos desde MongoDB
router.get('/pozos', async (req, res) => {
    try {
        const db = await conectarDB();
        const pozos = await db.collection('pozos').find({}, { projection: { _id: 0 } }).toArray();
        res.json(pozos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los pozos de la base de datos' });
    }
});

// GET /api/pozos/:codigo - Buscar pozo por código
router.get('/pozos/:codigo', async (req, res) => {
    try {
        const codigoPozo = req.params.codigo;
        const db = await conectarDB();
        const pozo = await db.collection('pozos').findOne({ codigo: codigoPozo }, { projection: { _id: 0 } });

        if (!pozo) {
            return res.status(404).json({ error: `No se encontró ningún pozo con el código: ${codigoPozo}` });
        }

        res.json(pozo);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el pozo en la base de datos' });
    }
});

// POST /api/pozos - Registrar un nuevo pozo en MongoDB
router.post('/pozos', async (req, res) => {
    try {
        const nuevoPozo = req.body;

        if (!nuevoPozo || !nuevoPozo.codigo || !nuevoPozo.ubicacion || !nuevoPozo.estado) {
            return res.status(400).json({ error: 'Faltan datos obligatorios (codigo, ubicacion, estado)' });
        }

        const db = await conectarDB();
        const collection = db.collection('pozos');

        const pozoExistente = await collection.findOne({ codigo: nuevoPozo.codigo });
        if (pozoExistente) {
            return res.status(400).json({ error: `Ya existe un pozo registrado con el código: ${nuevoPozo.codigo}` });
        }

        const ultimoPozo = await collection.find().sort({ id: -1 }).limit(1).toArray();
        const nextId = ultimoPozo.length > 0 && ultimoPozo[0].id ? ultimoPozo[0].id + 1 : 1;
        const pozoGuardado = { id: nuevoPozo.id ?? nextId, ...nuevoPozo };

        await collection.insertOne(pozoGuardado);
        delete pozoGuardado._id;

        res.status(201).json({ mensaje: 'Pozo registrado con éxito', pozo: pozoGuardado });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el pozo en la base de datos' });
    }
});

// PUT /api/pozos/:codigo - Actualizar pozo por código
router.put('/pozos/:codigo', async (req, res) => {
    try {
        const codigoPozo = req.params.codigo;
        const datosActualizados = req.body;
        const db = await conectarDB();
        const collection = db.collection('pozos');
        const pozoExistente = await collection.findOne({ codigo: codigoPozo });

        if (!pozoExistente) {
            return res.status(404).json({ error: `No se encontró el pozo con código: ${codigoPozo}` });
        }

        const updateData = { ...datosActualizados, codigo: codigoPozo };
        delete updateData._id;

        await collection.updateOne({ codigo: codigoPozo }, { $set: updateData });
        const pozoActualizado = await collection.findOne({ codigo: codigoPozo }, { projection: { _id: 0 } });

        res.json({ mensaje: `Pozo ${codigoPozo} actualizado correctamente`, actualizacion: pozoActualizado });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el pozo en la base de datos' });
    }
});

// DELETE /api/pozos/:codigo - Eliminar pozo por código
router.delete('/pozos/:codigo', async (req, res) => {
    try {
        const codigoPozo = req.params.codigo;
        const db = await conectarDB();
        const collection = db.collection('pozos');
        const resultado = await collection.deleteOne({ codigo: codigoPozo });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ error: `No se encontró ningún pozo con el código ${codigoPozo} para eliminar` });
        }

        res.json({ mensaje: `Pozo con código ${codigoPozo} eliminado correctamente` });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el pozo de la base de datos' });
    }
});

module.exports = router;