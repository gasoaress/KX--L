import ClienteRepository from '../repositories/ClienteRepository.js'

class ClientesController {
    async index(req, res) {
        try {
            const row = await ClienteRepository.findAll()
            res.json(row)
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar clientes.", error });
        }
    }

    async show(req, res) {
        try {
            const id = req.params.id
            const row = await ClienteRepository.findById(id)
            res.json(row)
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar cliente.", error });
        }
    }

    async store(req, res) {
        try {
            const cliente = req.body
            const row = await ClienteRepository.create(cliente)
            res.json(row)
        } catch (error) {
            res.status(500).json({ message: "Erro ao cadastrar cliente.", error });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id
            const cliente = req.body
            const row = await ClienteRepository.update(cliente, id)
            res.json(row)
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar cliente.", error });
        }

    }

    async delete(req, res) {
        try {
            const id = req.params.id
            const row = await ClienteRepository.delete(id)
            res.json(row)
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar cliente.", error });
        }
    }

}

export default new ClientesController();