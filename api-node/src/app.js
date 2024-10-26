import express from 'express';
import cors from 'cors'
import ClientesController from './app/controllers/ClientesController.js';
import ProdutosController from './app/controllers/ProdutosController.js';
import VendasController from './app/controllers/VendasController.js';

const app = express();

app.use(cors());
app.use(express.json());

//Rota Padrao
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Rotas 

//Clientes
app.get('/clientes', ClientesController.index);
app.get('/clientes/:id', ClientesController.show);
app.post('/clientes', ClientesController.store);
app.put('/clientes/:id', ClientesController.update);
app.delete('/clientes/:id', ClientesController.delete);

//Produtos
app.get('/produtos', ProdutosController.index);
app.get('/produtos/:id', ProdutosController.show);
app.post('/produtos', ProdutosController.store);
app.put('/produtos/:id', ProdutosController.update);
app.delete('/produtos/:id', ProdutosController.delete);

//Vendas
app.get('/vendas', VendasController.index);
app.get('/vendas/:id', VendasController.show);
app.post('/vendas', VendasController.store);
app.put('/vendas/:id', VendasController.update);
app.delete('/vendas/:id', VendasController.delete);

export default app;