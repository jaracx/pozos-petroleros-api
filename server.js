const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const pozosRoutes = require('./routes/pozos.routes');
app.use('/api', pozosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});