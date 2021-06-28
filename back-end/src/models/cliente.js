const Sequelize = require('sequelize');

//busco os dados de configuracao do bd
const sequelize = require('../database/database.js');

//o define cria a tabela no bd
//o nome da tabela é invoice
//defino os atributos
const Cliente = sequelize.define("cliente", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nome: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
            len: [3, 100]
        }
    },
    cpf: {
        allowNull: false,
        type: Sequelize.STRING(11),
        validate: {
            len: [3, 100]
        }
    },
    
    datan: {
        allowNull: false,
        type: Sequelize.DATE()
    },
    endereco: {
        allowNull: false,
        type: Sequelize.STRING(200),
        validate: {
            len: [3, 100]
        }
    },
    telefone: {
        allowNull: false,
        type: Sequelize.STRING(15),
        validate: {
            len: [3, 100]
        }
    }
    
});

module.exports = Cliente;