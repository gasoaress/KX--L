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

function ClientesUpdate() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [fone, setFone] = useState('');
    const [data_nascimento, setDataNascimento] = useState('');
    const [notification, setNotification] = useState(null);
    const { id } = useParams(); 

    useEffect(() => {
        fetch(`http://localhost:8080/clientes/${id}`) 
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) { 
                    const clienteData = data[0]; 
                    setNome(clienteData.nome);
                    setEmail(clienteData.email);
                    setFone(clienteData.fone);
                    setDataNascimento(formatDate(clienteData.data_nascimento));
                }
            })
            .catch((error) => console.error('Erro ao buscar cliente:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataParts = data_nascimento.split('-');
        const dataFormatada = new Date(`${dataParts[2]}-${dataParts[1]}-${dataParts[0]}`).toISOString().split('T')[0];
        
        
        const update = {
            nome,
            email,
            fone,
            data_nascimento: dataFormatada,
        };

        fetch(`http://localhost:8080/clientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
        })
            .then((response) => {
                if (response.ok) {
                    setNotification("Cliente atualizado!"); 
                    setTimeout(() => setNotification(null), 3000); 
                }
            })
            .catch((error) => console.error('Erro ao atualizar cliente:', error));
    };

    return (
        <div className="container">
            <h1>Editar Cliente</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div>
                    <label>Data de Nascimento</label>
                    <input
                        type="text"
                        value={data_nascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                        placeholder="DD-MM-YYYY"
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Telefone</label>
                    <input type="text" value={fone} onChange={(e) => setFone(e.target.value)} required />
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

export default ClientesUpdate;
