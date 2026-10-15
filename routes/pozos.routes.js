const express = require('express');
const router = express.Router();

router.get('/pozos', async (req, res) => {
    try {
        res.json({ mensaje: "Endpoint para listar todos los pozos petroleros" });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los pozos" });
    }
});

router.get('/pozos/:codigo', async (req, res) => {
    try {
        const codigoPozo = req.params.codigo;
        res.json({ mensaje: `Buscando el pozo con código: ${codigoPozo}` });
    } catch (error) {
        res.status(500).json({ error: "Error al buscar el pozo" });
    }
});

router.post('/pozos', async (req, res) => {
    try {
        const nuevoPozo = req.body;
        if (!nuevoPozo.codigo || !nuevoPozo.ubicacion || !nuevoPozo.estado) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }
        res.status(201).json({ mensaje: "Pozo registrado con éxito", pozo: nuevoPozo });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el pozo" });
    }
});

router.put('/pozos/:codigo', async (req, res) => {
    try {
        const codigoPozo = req.params.codigo;
        const datosActualizados = req.body;
        res.json({ mensaje: `Pozo ${codigoPozo} actualizado correctamente`, actualizacion: datosActualizados });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el pozo" });
    }
});

module.exports = router;