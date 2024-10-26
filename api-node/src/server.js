import app from "./app.js"

const PORT = 8080;

// Escutar a porta
app.listen(PORT, () => { 
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
})
