import React, { useState } from 'react';
import '../cadastroStyle.css';

function ClientesCadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [fone, setFone] = useState('');
  const [data_nascimento, setDataNascimento] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaVenda = {
      nome,
      email,
      fone,
      data_nascimento,
    };

    fetch('http://localhost:8080/clientes', {
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
        setEmail('');
        setFone('');
        setDataNascimento('');
      })
      .catch((error) => console.error('Erro ao cadastrar clientes:', error));
  };

  return (
    <div className="container">
      <h1>Cadastro de Clientes</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Fone</label>
          <input type="text" value={fone} onChange={(e) => setFone(e.target.value)} />
        </div>
        <div>
          <label>Data de Nascimento</label>
          <input type="date" value={data_nascimento} onChange={(e) => setDataNascimento(e.target.value)} />
        </div>
        <button className='submitButton' type="submit">Cadastrar Cliente</button>
      </form>
    </div>
  );
}

export default ClientesCadastro;
