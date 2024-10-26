import ProdutoRepository from '../repositories/ProdutoRepository.js'

class ProdutosController {
    async index(req, res) {
        try {
            const row = await ProdutoRepository.findAll()
            res.json(row)
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar Produtos.", error });
        }
    }

    async show(req, res) {
        try {
            const id = req.params.id
            const row = await ProdutoRepository.findById(id)
            res.json(row)
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar Produto.", error });
        }
    }

    async store(req, res) {
        try {
            const produto = req.body
            const row = await ProdutoRepository.create(produto)
            res.json(row)
        } catch (error) {
            res.status(500).json({ message: "Erro ao cadastrar Produto.", error });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id
            const produto = req.body
            const row = await ProdutoRepository.update(produto, id)
            res.json(row)
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar Produto.", error });
        }

    }

    async delete(req, res) {
        try {
            const id = req.params.id
            const row = await ProdutoRepository.delete(id)
            res.json(row)
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar produto.", error });
        }
    }

}

export default new ProdutosController();