require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta de bienvenida en HTML
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <h1>API de Gestión de Pozos Petroleros</h1>
        <p>Servidor activo. Consultá la documentación o accedé a la API en /api/pozos</p>
    `);
});

// Rutas de la API
const pozosRoutes = require('./routes/pozos.routes');
app.use('/api', pozosRoutes);

// Manejo de rutas inexistentes (404 general)
app.use((req, res) => {
    res.status(404).json({ error: `La ruta '${req.originalUrl}' no existe en este servidor.` });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

module.exports = app;