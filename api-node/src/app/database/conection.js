import mysql from 'mysql';

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '2316',
    database: 'db-kx'
});

conexao.connect();

/**
 * Executa um código sql com ou sem valores
 * @param {string} sql instrução sql a ser executada
 * @param {string=id | [Cliente, id]} valores a serem passados para o sql
 * @param {string} mensagemReject mensagem a ser exibida
 * @returns objeto da Promise
 */
export const consult = (sql, valores = '', mensagemReject) => {
    return new Promise((resolve, reject) => {
        try {
            conexao.query(sql, valores, (erro, resultado) => {
                if (erro) {
                    console.error("Erro na execução do SQL:", erro); // Log do erro para debug
                    return reject(new Error(`${mensagemReject}: ${erro.message}`)); // Passa a mensagem personalizada junto com o erro real
                }
                const row = JSON.parse(JSON.stringify(resultado));
                return resolve(row);
            });
        } catch (error) {
            console.error("Erro inesperado:", error); // Captura qualquer erro inesperado
            reject(new Error("Erro inesperado ao executar a consulta.")); // Rejeita a Promise com uma mensagem mais genérica
        }
    });
};

export default conexao;
