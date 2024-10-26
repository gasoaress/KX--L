import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../tableStyle.css';
import NotificationCard from '../../components/NotificationCard/NotificationCard.js';
import { NavLink } from 'react-router-dom';

function Vendas() {
    const [vendas, setVendas] = useState([]);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/vendas')
            .then((response) => response.json())
            .then((data) => setVendas(data))
            .catch((error) => console.error('Erro ao buscar vendas:', error));
    }, []);

    const excluirVenda = (vendaId) => {
        fetch(`http://localhost:8080/vendas/${vendaId}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.ok) {
                    setVendas((prevVendas) => {
                        const vendaRemovida = prevVendas.find(venda => venda.id === vendaId);
                        if (vendaRemovida) {
                            console.log("Venda removida:", vendaRemovida);
                            setNotification("Venda Excluída");
                            setTimeout(() => setNotification(null), 3000);
                            return prevVendas.filter(venda => venda.id !== vendaId);
                        } else {
                            console.warn("Venda já removida ou não encontrada:", vendaId);
                            return prevVendas;
                        }
                    });
                }
            })
            .catch((error) => console.error("Erro ao excluir venda:", error));
    };

    const botoesDeAcoes = (rowData) => {
        return (
            <div className="icons-div">
                <NavLink to={`/vendasupdate/${rowData.id}`}>
                    <i className="pi pi-pencil icon-actions-edit" onClick={() => console.log('Editar', rowData)}></i>
                </NavLink>
                <i className="pi pi-trash icon-actions-excluir" onClick={() => excluirVenda(rowData.id)}></i>
            </div>
        );
    };



    return (
        <div>
            <div className="header-container">
                <h1 className="p-datatable-header">Vendas</h1>
                <NavLink to="/vendascadastro">

                    <button className="btn-cadastrar">Cadastrar</button>
                </NavLink>

            </div>
            <DataTable value={vendas} paginator rows={20} className="p-datatable-customers test">
                <Column field="id" header="ID" sortable />
                <Column field="nome" header="Nome" sortable />
                <Column field="valor_venda" header="Valor de Venda" sortable /> R$
                <Column field="codigo_produto" header="Código do Produto" />
                <Column field="quantidade" header="Quantidade" sortable />
                <Column body={botoesDeAcoes} header="Ações" style={{ width: '150px', textAlign: 'center' }} />
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
export default Vendas;
