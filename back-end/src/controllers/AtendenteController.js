const Atendente = require('../models/atendente');
const status = require('http-status');




//inserir os dados no banco
exports.Insert = (req, res, next) => {
    //na requisicao de insert
    //ele retorna um json no corpo
    //precisamos pegar cada dados e inserir na respectiva propriedade
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const matricula = req.body.matricula;
    const dataCadastro = req.body.dataCadastro;
    

    //aqui passa os parametros com dados para os atributos do model
    Atendente.create({
        nome: nome,
        cpf : cpf ,
        matricula: matricula,
        dataCadastro: dataCadastro
        
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(atendente => {
            if (atendente) {
                res.status(status.OK).send(atendente);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};

exports.SearchAll = (req, res, next) => {
    Atendente.findAll()
        .then(atendente => {
            if (atendente) {
                res.status(status.OK).send(atendente);
            }
        })
        .catch(error => next(error));
}

exports.SearchOne = (req, res, next) => {
    const id = req.params.id;

    Atendente.findByPk(id)
        .then(atendente => {
            if (atendente) {
                res.status(status.OK).send(atendente);
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
    const matricula = req.body.matricula;
    const dataCadastro = req.body.dataCadastro;
    

    Atendente.findByPk(id)
        //primeiro precisamos verificar se o dado existe
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(atendente => {
            if (atendente) {
                //se existir, vai atualizar
                //passa um objeto com as infos
                atendente.update({
                    nome: nome,
                    cpf: cpf,
                    matricula: matricula,
                    dataCadastro: dataCadastro

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

    Atendente.findByPk(id)
        .then(atendente => {
            if (atendente) {
                atendente.destroy({
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
