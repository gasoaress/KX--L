import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../cadastroStyle.css';
import NotificationCard from '../../components/NotificationCard/NotificationCard';

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function VendasUpdate() {
    const [venda, setVenda] = useState(null); 
    const [nome, setNome] = useState('');
    const [valorProduto, setValorProduto] = useState(0);
    const [valor_venda, setValorVenda] = useState(0);
    const [codigo_produto, setCodigoProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [data_venda, setData] = useState('');
    const [id_cliente, setIdCliente] = useState('');
    const [id_produto, setIdProduto] = useState('');
    const [notification, setNotification] = useState(null); 

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8080/vendas/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) { 
                    const vendaData = data[0]; 
                    setVenda(vendaData);
                    setNome(vendaData.nome);
                    setValorVenda(vendaData.valor_venda);
                    setData(formatDate(vendaData.data_venda)); 
                    setCodigoProduto(vendaData.codigo_produto);
                    setQuantidade(vendaData.quantidade);
                    setIdCliente(vendaData.id_cliente);
                    setIdProduto(vendaData.id_produto);
                    setValorProduto(vendaData.valor_venda / vendaData.quantidade);
                }
            })
            .catch((error) => console.error('Erro ao buscar venda:', error));
    }, [id]);

    useEffect(() => {
        if (quantidade && valorProduto) {
            const novoValorVenda = quantidade * valorProduto;
            setValorVenda(novoValorVenda);
        }
    }, [quantidade, valorProduto]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataParts = data_venda.split('-');
        const dataFormatada = new Date(`${dataParts[2]}-${dataParts[1]}-${dataParts[0]}`).toISOString().split('T')[0];
        
        const update = {
            nome,
            valor_venda,
            data_venda: dataFormatada,
            codigo_produto,
            quantidade,
            id_cliente,
            id_produto
        };

        fetch(`http://localhost:8080/vendas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
        })
            .then((response) => {
                if (response.ok) {
                    setNotification("Venda atualizada com sucesso!"); 
                    setTimeout(() => setNotification(null), 3000);
                }
            })
            .catch((error) => console.error('Erro ao atualizar venda:', error));
    };

    return (
        <div className="container">
            <h1>Editar Venda</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome Produto</label>
                    <input type="text" value={nome} readOnly />
                </div>
                <div>
                    <label>Data Venda:</label>
                    <input
                        type="text"
                        value={data_venda}
                        onChange={(e) => setData(e.target.value)}
                        placeholder="DD-MM-YYYY"
                        required
                    />
                </div>
                <div>
                    <label>Código do Produto:</label>
                    <input type="text" value={codigo_produto} readOnly />
                </div>
                <div>
                    <label>Quantidade:</label>
                    <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
                </div>
                <div>
                    <label>Valor da Venda:</label>
                    <input type="number" value={valor_venda} readOnly />
                </div>
                <button className="submitButton" type="submit">Atualizar Venda</button>
            </form>
            {notification && (
                <NotificationCard
                    message={notification}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
}

export default VendasUpdate;
