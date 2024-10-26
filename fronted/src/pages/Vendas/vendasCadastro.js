import React, { useState, useEffect } from 'react';
import '../cadastroStyle.css';

function CadastroVendas() {
    const [produtos, setProdutos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [nome, setNomeProduto] = useState('');
    const [valorProduto, setValorProduto] = useState('');
    const [valor_venda, setValorVenda] = useState(0);
    const [codigo_produto, setCodigoProduto] = useState('');
    const [nomeCliente, setNomeCliente] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [estoque, setEstoque] = useState('');
    const [clienteSelecionado, setClienteSelecionado] = useState('');
    const [produtoSelecionado, setProdutoSelecionado] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/produtos')
            .then((response) => response.json())
            .then((data) => setProdutos(data))
            .catch((error) => console.error('Erro ao buscar produtos:', error));

        fetch('http://localhost:8080/clientes')
            .then((response) => response.json())
            .then((data) => setClientes(data))
            .catch((error) => console.error('Erro ao buscar clientes:', error));
    }, []);

    useEffect(() => {
        if (produtoSelecionado) {
            const produto = produtos.find(p => p.id === parseInt(produtoSelecionado));
            if (produto) {
                setNomeProduto(produto.nome);
                setValorProduto(produto.preco);
                setCodigoProduto(produto.codigo);
                setEstoque(produto.estoque);
                calcularValorVenda(quantidade, produto.preco);
            }
        }
    }, [produtoSelecionado, produtos]);

    const calcularValorVenda = (quantidade, valor) => {
        const novoValorVenda = quantidade * valor;
        setValorVenda(novoValorVenda);
    };

    useEffect(() => {
        if (valorProduto) {
            calcularValorVenda(quantidade, valorProduto);
        }
    }, [quantidade, valorProduto]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const novaVenda = {
            nome,
            valor_venda,
            codigo_produto,
            quantidade,
            id_cliente: clienteSelecionado,
            id_produto: produtoSelecionado,
        };

        const vendasArray = [novaVenda];
        console.log(novaVenda);

        fetch('http://localhost:8080/vendas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(vendasArray),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('Venda cadastrada com sucesso!');
                setNomeProduto('');
                setValorProduto('');
                setCodigoProduto('');
                setNomeCliente('');
                setQuantidade('');
                setEstoque('');
                setClienteSelecionado('');
                setProdutoSelecionado('');
                setValorVenda(0); 
            })
            .catch((error) => console.error('Erro ao cadastrar venda:', error));
    };

    return (
        <div className="container">
            <h1>Cadastro de Venda</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome do Cliente:</label>
                    <select value={clienteSelecionado} onChange={(e) => setClienteSelecionado(e.target.value)} required>
                        <option value="">Selecione um cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Nome do Produto:</label>
                    <select value={produtoSelecionado} onChange={(e) => setProdutoSelecionado(e.target.value)} required>
                        <option value="">Selecione um produto</option>
                        {produtos.map(produto => (
                            <option key={produto.id} value={produto.id}>{produto.nome}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Valor do Produto:</label>
                    <input type="text" value={valorProduto} readOnly />
                </div>
                <div>
                    <label>Código do Produto:</label>
                    <input type="text" value={codigo_produto} readOnly />
                </div>
                <div>
                    <label>Estoque:</label>
                    <input type="number" value={estoque} readOnly />
                </div>
                <div>
                    <label>Quantidade:</label>
                    <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
                </div>
                <div>
                    <label>Valor da Venda:</label>
                    <input type="number" value={valor_venda} readOnly />
                </div>
                <button className="submitButton" type="submit">Cadastrar Venda</button>
            </form>
        </div>
    );
}

export default CadastroVendas;
