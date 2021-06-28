const Cliente = require('../models/cliente');
const status = require('http-status');




//inserir os dados no banco
exports.Insert = (req, res, next) => {
    //na requisicao de insert
    //ele retorna um json no corpo
    //precisamos pegar cada dados e inserir na respectiva propriedade
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const datan = req.body.datan;
    const endereco = req.body.endereco;
    const telefone = req.body.telefone;
    

    //aqui passa os parametros com dados para os atributos do model
    Cliente.create({
        nome: nome,
        cpf : cpf ,
        datan: datan,
        endereco: endereco,
        telefone:telefone
        
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(cliente => {
            if (cliente) {
                res.status(status.OK).send(cliente);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};

exports.SearchAll = (req, res, next) => {
    Cliente.findAll()
        .then(cliente => {
            if (cliente) {
                res.status(status.OK).send(cliente);
            }
        })
        .catch(error => next(error));
}

exports.SearchOne = (req, res, next) => {
    const id = req.params.id;

    Cliente.findByPk(id)
        .then(cliente => {
            if (cliente) {
                res.status(status.OK).send(cliente);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};


//atualizar os dados
exports.Update = (req, res, next) => {
    //na requisicao de atualizar
    //quando atualizamos enviamos o id, que vai ser pego da url
    const id = req.params.id;
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const datan = req.body.datan;
    const endereco = req.body.endereco;
    const telefone = req.body.telefone;
    

    Cliente.findByPk(id)
        //primeiro precisamos verificar se o dado existe
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(cliente => {
            if (cliente) {
                //se existir, vai atualizar
                //passa um objeto com as infos
                cliente.update({
                    nome: nome,
                    cpf: cpf,
                    datan: datan,
                    endereco: endereco,
                    telefone: telefone

                },
                    //recebe um parametro id na clausula where
                    {
                        where: { id: id }
                    })
                    .then(() => {
                        //status 200 é o padrao
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                //caso nao existir, retorna erro
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};

exports.Delete = (req, res, next) => {
    const id = req.params.id;

    Cliente.findByPk(id)
        .then(cliente => {
            if (cliente) {
                cliente.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            }
            else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
