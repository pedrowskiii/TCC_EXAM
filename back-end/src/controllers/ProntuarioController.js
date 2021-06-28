const Prontuario = require('../models/prontuario');
const status = require('http-status');




//inserir os dados no banco
exports.Insert = (req, res, next) => {
    //na requisicao de insert
    //ele retorna um json no corpo
    //precisamos pegar cada dados e inserir na respectiva propriedade
    
    const nome_cliente = req.body.nome_cliente;
    const cpf_cliente = req.body.cpf_cliente;
    const nome_medico = req.body.nome_medico;
    const crm_medico = req.body.crm_medico;



    const diagnostico = req.body.diagnostico;
    const medicamento = req.body.medicamento;
    const exames = req.body.exames;
    const pagamento = req.body.pagamento;
    //const dataCadastro = req.body.dataCadastro;
    

    //aqui passa os parametros com dados para os atributos do model
    Prontuario.create({
        nome_cliente: nome_cliente,
        cpf_cliente: cpf_cliente,
        nome_medico: nome_medico,
        crm_medico: crm_medico,


        diagnostico: diagnostico,
        medicamento : medicamento ,
        exames: exames,
        pagamento: pagamento
        //dataCadastro: dataCadastro
        
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(prontuario => {
            if (prontuario) {
                res.status(status.OK).send(prontuario);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};

exports.SearchAll = (req, res, next) => {
    Prontuario.findAll()
        .then(prontuario => {
            if (prontuario) {
                res.status(status.OK).send(prontuario);
            }
        })
        .catch(error => next(error));
}

exports.SearchOne = (req, res, next) => {
    const id = req.params.id;

    Prontuario.findByPk(id)
        .then(prontuario => {
            if (prontuario) {
                res.status(status.OK).send(prontuario);
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

    const nome_cliente = req.body.nome_cliente;
    const cpf_cliente = req.body.cpf_cliente;
    const nome_medico = req.body.nome_medico;
    const crm_medico = req.body.crm_medico;
    
    const diagnostico = req.body.diagnostico;
    const medicamento = req.body.medicamento;
    const exames = req.body.exames;
    const pagamento = req.body.pagamento;
   // const dataCadastro = req.body.dataCadastro;
    

    Prontuario.findByPk(id)
        //primeiro precisamos verificar se o dado existe
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(prontuario => {
            if (prontuario) {
                //se existir, vai atualizar
                //passa um objeto com as infos
                prontuario.update({
                    nome_cliente: nome_cliente,
                    cpf_cliente: cpf_cliente,
                    nome_medico: nome_medico,
                    crm_medico: crm_medico,

                    diagnostico: diagnostico,
                    medicamento: medicamento,
                    exames: exames,
                    pagamento  : pagamento
                    //dataCadastro: dataCadastro

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

    Prontuario.findByPk(id)
        .then(prontuario => {
            if (prontuario) {
                prontuario.destroy({
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
