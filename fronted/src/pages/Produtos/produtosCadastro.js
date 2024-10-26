import React, { useState } from 'react';
import '../cadastroStyle.css';

function ProdutosCadastro() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [codigo, setCodigo] = useState('');
    const [estoque, setEstoque] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const novaVenda = {
            nome,
            descricao,
            preco,
            codigo,
            estoque
        };

        fetch('http://localhost:8080/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novaVenda),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('Venda cadastrada com sucesso!');
                setNome('');
                setDescricao('');
                setPreco('');
                setCodigo('');
                setEstoque('');
            })
            .catch((error) => console.error('Erro ao cadastrar produto:', error));
    };

    return (
        <div className="container">
            <h1>Cadastro de Produtos</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div>
                    <label>Descrição</label>
                    <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                </div>
                <div>
                    <label>Preço</label>
                    <input type="text" value={preco} onChange={(e) => setPreco(e.target.value)} />
                </div>
                <div>
                    <label>Código</label>
                    <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                </div>
                <div>
                    <label>Estoque</label>
                    <input type="text" value={estoque} onChange={(e) => setEstoque(e.target.value)} />
                </div>
                <button className='submitButton' type="submit">Cadastrar Produto</button>
            </form>
        </div>
    );
}

export default ProdutosCadastro;
