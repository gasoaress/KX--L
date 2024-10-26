import VendaRepository from '../repositories/VendaRepository.js'
import ProdutoRepository from '../repositories/ProdutoRepository.js';

class VendasController {
    async index(req, res) {
        try {
            const row = await VendaRepository.findAll()
            res.json(row)
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar Vendas.", error });
        }
    }

    async show(req, res) {
        try {
            const id = req.params.id
            const row = await VendaRepository.findById(id)
            res.json(row)
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar Venda.", error });
        }
    }

    async store(req, res) {
        try {
            const Venda = req.body
            const row = await VendaRepository.create(Venda)
            res.json(row)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erro ao cadastrar Venda.", error });
        }
    }

    async update(req, res) {
        try {
            let id, quantidadeNova, vendaOriginal, quantidadeOriginal;
            id = req.params.id;
            quantidadeNova = req.body.quantidade;
            vendaOriginal = await VendaRepository.findById(id).then(rows => rows[0]);
            quantidadeOriginal = vendaOriginal.quantidade
        console.log(req.body.id_produto);
        
            if (quantidadeNova != quantidadeOriginal) {
                const produto = await ProdutoRepository.findById(req.body.id_produto);
                if (quantidadeNova > quantidadeOriginal) {
                    produto.estoque = produto.estoque - (quantidadeNova - quantidadeOriginal);
                    await ProdutoRepository.update(produto, produto.id)
                }
                if (quantidadeNova < quantidadeOriginal) {
                    produto.estoque = produto.estoque + (quantidadeOriginal - quantidadeNova);
                    console.log(produto);
                    await ProdutoRepository.update(produto, produto.id)
                }
            }
            const Venda = req.body
            const row = await VendaRepository.update(Venda, id)
            res.json(row)
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar Venda.", error });
            console.log(error);
            
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id
            const row = await VendaRepository.delete(id)
            res.json(row)
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar Venda.", error });
        }
    }

}

export default new VendasController();