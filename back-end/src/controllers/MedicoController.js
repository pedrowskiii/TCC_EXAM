const Medico = require('../models/medico');
const status = require('http-status');




//inserir os dados no banco
exports.Insert = (req, res, next) => {
    //na requisicao de insert
    //ele retorna um json no corpo
    //precisamos pegar cada dados e inserir na respectiva propriedade
    const nome = req.body.nome;
    const crm = req.body.crm;
    const especialidade = req.body.especialidade;
    const dataCadastro = req.body.dataCadastro;
    

    //aqui passa os parametros com dados para os atributos do model
    Medico.create({
        nome: nome,
        crm : crm ,
        especialidade: especialidade,
        dataCadastro: dataCadastro
        
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(medico => {
            if (medico) {
                res.status(status.OK).send(medico);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};

exports.SearchAll = (req, res, next) => {
    Medico.findAll()
        .then(medico => {
            if (medico) {
                res.status(status.OK).send(medico);
            }
        })
        .catch(error => next(error));
}

exports.SearchOne = (req, res, next) => {
    const id = req.params.id;

    Medico.findByPk(id)
        .then(medico => {
            if (medico) {
                res.status(status.OK).send(medico);
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
    const crm = req.body.crm;
    const especialidade = req.body.especialidade;
    const dataCadastro = req.body.dataCadastro;
    

    Medico.findByPk(id)
        //primeiro precisamos verificar se o dado existe
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(medico => {
            if (medico) {
                //se existir, vai atualizar
                //passa um objeto com as infos
                medico.update({
                    nome: nome,
                    crm: crm,
                    especialidade: especialidade,
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

    Medico.findByPk(id)
        .then(medico => {
            if (medico) {
                medico.destroy({
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
