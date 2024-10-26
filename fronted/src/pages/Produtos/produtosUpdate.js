import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../cadastroStyle.css';
import NotificationCard from '../../components/NotificationCard/NotificationCard';

function ProdutosUpdate() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [codigo, setCodigo] = useState('');
    const [estoque, setEstoque] = useState('');
    const [notification, setNotification] = useState(null); 

    const { id } = useParams(); 

    useEffect(() => {
        fetch(`http://localhost:8080/produtos/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setNome(data.nome);
                    setDescricao(data.descricao);
                    setPreco(data.preco);
                    setCodigo(data.codigo);
                    setEstoque(data.estoque);
                }
            })
            .catch((error) => console.error('Erro ao buscar produto:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const update = {
            nome,
            descricao,
            preco,
            codigo,
            estoque,
        };

        fetch(`http://localhost:8080/produtos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
        })
            .then((response) => {
                if (response.ok) {
                    setNotification("Produto Atualizado!"); 
                    setTimeout(() => setNotification(null), 3000);
                }
            })
            .catch((error) => console.error('Erro ao atualizar produto:', error));
    };

    return (
        <div className="container">
            <h1>Editar Produto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div>
                    <label>Descrição</label>
                    <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                </div>
                <div>
                    <label>Preço</label>
                    <input type="text" value={preco} onChange={(e) => setPreco(e.target.value)} required />
                </div>
                <div>
                    <label>Código</label>
                    <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
                </div>
                <div>
                    <label>Estoque</label>
                    <input type="text" value={estoque} onChange={(e) => setEstoque(e.target.value)} required />
                </div>
                <button className="submitButton" type="submit">Atualizar Cliente</button>
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

export default ProdutosUpdate;