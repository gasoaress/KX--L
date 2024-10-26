import { consult } from "../database/conection.js";
class ClienteRepository {
    // CRUD CLIENTE
    create(cliente) {
        const sql = `INSERT INTO clientes SET ?`;
        return consult(sql, cliente, "Não foi possível cadastrar!" )
    };

    findAll() {
        const sql = "SELECT * FROM clientes"
        return consult(sql, "Não foi possível localizar!" )
    };

    findById(id) {
        const sql = `SELECT * FROM clientes WHERE id = ?`;
        return consult(sql, id, "Não foi possível localizar!" )
    };

    update(cliente, id) {
        const sql = `UPDATE clientes SET ? WHERE id = ?`;
        return consult(sql, [cliente, id] , "Não foi possível atualizar!" )
    };

    delete(id) {
        const sql = `DELETE FROM clientes WHERE id = ?`;
        return consult(sql, id, "Não foi possível apagar!" )
    }
}

export default new ClienteRepository();