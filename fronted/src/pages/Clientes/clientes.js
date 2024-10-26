import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../tableStyle.css';
import NotificationCard from '../../components/NotificationCard/NotificationCard';
import { NavLink } from 'react-router-dom';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/clientes')
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Erro ao buscar clientes:', error));
  }, []);

  const formatarData = (rowData) => {
    const data = new Date(rowData.data_nascimento);
    return data.toLocaleDateString('pt-BR');
  };

  const excluirCliente = (clienteId) => {
    fetch(`http://localhost:8080/clientes/${clienteId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setClientes((prevClientes) => {
            const clienteRemovido = prevClientes.find(cliente => cliente.id === clienteId);
            if (clienteRemovido) {
              setNotification("Cliente Excluído");
              setTimeout(() => setNotification(null), 3000);
              return prevClientes.filter(cliente => cliente.id !== clienteId);
            } else {
              console.warn("cliente já removida ou não encontrada:", clienteId);
              return prevClientes;
            }
          });
        }
      })
      .catch((error) => console.error("Erro ao excluir cliente:", error));
  };

  const botoesDeAcoes = (rowData) => {
    return (
      <div className="icons-div">
        <NavLink to={`/clientesupdate/${rowData.id}`}>
          <i className="pi pi-pencil icon-actions-edit"></i>
        </NavLink>
        <i className="pi pi-trash icon-actions-excluir" onClick={() => excluirCliente(rowData.id)}></i>
      </div>
    );
  };

  return (
    <div>
      <div className="header-container">
        <h1 className="p-datatable-header">Clientes</h1>
        <NavLink to={"/clientescadastro"}>
          <button className="btn-cadastrar">Cadastrar</button>
        </NavLink>
      </div>
      <DataTable value={clientes} paginator rows={10} className="p-datatable-customers test">
        <Column field="id" header="ID" sortable />
        <Column field="nome" header="Nome" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="fone" header="Telefone" sortable />
        <Column field="data_nascimento" header="Data de Nascimento" sortable body={formatarData} />
        <Column body={botoesDeAcoes} header="Ações" />
      </DataTable>
      {notification && (
        <NotificationCard
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default Clientes;
