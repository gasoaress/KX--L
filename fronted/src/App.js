import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import './App.css';
import Layout from "./components/Layout/Layout";
import Vendas from "./pages/Vendas/vendas";
import VendasCadastro from "./pages/Vendas/vendasCadastro";
import VendasUpdate from "./pages/Vendas/vendasUpdate";
import Clientes from "./pages/Clientes/clientes";
import ClientesCadastro from "./pages/Clientes/clientesCadastro";
import ClientesUpdate from "./pages/Clientes/clientesUpdate";
import Produtos from "./pages/Produtos/produtos";
import ProdutosCadastro from "./pages/Produtos/produtosCadastro";
import ProdutosUpdate from "./pages/Produtos/produtosUpdate";
import 'typeface-roboto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Vendas />} /> 
          <Route path="vendas" element={<Vendas />} />
          <Route path="vendascadastro" element={<VendasCadastro />} />
          <Route path="vendasupdate/:id" element={<VendasUpdate />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="clientescadastro" element={<ClientesCadastro />} />
          <Route path="clientesUpdate/:id" element={<ClientesUpdate />} />
          <Route path="produtos" element={<Produtos />} /> 
          <Route path="produtoscadastro" element={<ProdutosCadastro />} /> 
          <Route path="produtosupdate/:id" element={<ProdutosUpdate />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
