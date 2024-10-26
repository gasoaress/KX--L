import { consult } from "../database/conection.js";
import ProdutoRepository from "./ProdutoRepository.js";

class VendaRepository {
    // CRUD VENDAS  
    async create(vendas) {
        const resultados = [];
        for (const venda of vendas) {
            const produto = await ProdutoRepository.findById(venda.id_produto);

            if (!produto) {
                throw new Error(`Produto não encontrado para ID: ${venda.id_produto}!`);
            }

            if (produto.estoque < venda.quantidade) {
                throw new Error(`Estoque insuficiente para o produto ID: ${venda.id_produto}!`);
            }

            const dataAtual = new Date().toISOString().split('T')[0];
            venda.data_venda = dataAtual;

            const novoEstoque = produto.estoque - venda.quantidade;
            await ProdutoRepository.update({ estoque: novoEstoque }, venda.id_produto);
            const sql = `INSERT INTO vendas SET ?`;
            const resultado = await consult(sql, venda, "Não foi possível cadastrar!");

            resultados.push(resultado);
        }
        return resultados;
    }

    findAll() {
        const sql = "SELECT * FROM vendas"
        return consult(sql, "Não foi possível localizar!")
    };

    findById(id) {
        const sql = `SELECT * FROM vendas WHERE id = ?`;
        return consult(sql, id, "Não foi possível localizar!")
    };

    update(venda, id) {
        const sql = `UPDATE vendas SET ? WHERE id = ?`;
        return consult(sql, [venda, id], "Não foi possível atualizar!")
    };

    delete(id) {
        const sql = `DELETE FROM vendas WHERE id = ?`;
        return consult(sql, id, "Não foi possível apagar!")
    }
}

export default new VendaRepository();