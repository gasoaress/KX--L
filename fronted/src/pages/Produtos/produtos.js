import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../tableStyle.css';
import NotificationCard from '../../components/NotificationCard/NotificationCard';
import { NavLink } from 'react-router-dom';

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/produtos')
            .then((response) => response.json())
            .then((data) => setProdutos(data))
            .catch((error) => console.error('Erro ao buscar produtos:', error));
    }, []);

    const editarProduto = (produto) => {
        console.log("Editando produto", produto);
        console.log("Fazer MODAL para edição de produtos posteriormente...");
    };

    const excluirProduto = (produtoId) => {
        fetch(`http://localhost:8080/produtos/${produtoId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    setProdutos((prevProdutos) => {
                        const produtoRemovido = prevProdutos.find(produto => produto.id === produtoId);
                        if (produtoRemovido) {
                            console.log("produto removida:", produtoRemovido);
                            setNotification("Produto Excluído"); 
                            setTimeout(() => setNotification(null), 3000);
                            return prevProdutos.filter(produto => produto.id !== produtoId);
                        } else {
                            console.warn("produto já removida ou não encontrada:", produtoId);
                            return prevProdutos;
                        }
                    });
                }
            })
            .catch((error) => console.error("Erro ao excluir produto:", error));
    };

    const botoesDeAcoes = (rowData) => {
        return (
            <div className="icons-div">
                <NavLink to={`/produtosupdate/${rowData.id}`}>
                    <i className="pi pi-pencil icon-actions-edit" onClick={() => editarProduto(rowData)}></i>
                </NavLink>
                <i className="pi pi-trash icon-actions-excluir" onClick={() => excluirProduto(rowData.id)}></i>
            </div>
        );
    };

    return (
        <div>
            <div className="header-container">
                <h1 className="p-datatable-header">Produtos</h1>
                <NavLink to={"/produtoscadastro"}>
                    <button className="btn-cadastrar">Cadastrar</button>
                </NavLink>
            </div>
            <DataTable value={produtos} paginator rows={10} className="p-datatable-customers test">
                <Column field="id" header="ID" sortable />
                <Column field="nome" header="Nome" sortable />
                <Column field="descricao" header="Descrição" sortable />
                <Column field="codigo" header="Código" />
                <Column field="preco" header="Preço" sortable />
                <Column field="estoque" header="Estoque" />
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

export default Produtos;