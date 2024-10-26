import { consult } from "../database/conection.js";
class ProdutoRepository {
    // CRUD PRODUTO
    create(produto) {
        const sql = `INSERT INTO produtos SET ?`;
        return consult(sql, produto, "Não foi possível cadastrar!" )
    };

    findAll() {
        const sql = "SELECT * FROM produtos"
        return consult(sql, "Não foi possível localizar!" )
    };

    findById(id) {
        const sql = `SELECT * FROM produtos WHERE id = ?`;
        return consult(sql, id, "Não foi possível localizar!" )
            .then(rows => rows[0]); 
    };

    update(produto, id) {
        const sql = `UPDATE produtos SET ? WHERE id = ?`;
        return consult(sql, [produto, id] , "Não foi possível atualizar!" )
    };

    delete(id) {
        const sql = `DELETE FROM produtos WHERE id = ?`;
        return consult(sql, id, "Não foi possível apagar!" )
    }
}

export default new ProdutoRepository();