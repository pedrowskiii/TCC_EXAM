const Sequelize = require('sequelize');

//busco os dados de configuracao do bd
const sequelize = require('../database/database.js');

//o define cria a tabela no bd
//o nome da tabela é invoice
//defino os atributos
const Prontuario = sequelize.define("prontuario", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    
 //novo
    nome_cliente: {
        
        type: Sequelize.STRING(200),
        validate: {
            len: [3, 100]
        }
    },
    
    cpf_cliente: {
         type: Sequelize.STRING(11),
        validate: {
            len: [3, 100]
        }
    },

    nome_medico: {
        
        type: Sequelize.STRING(200),
        validate: {
            len: [3, 100]
        }
    },
    
    crm_medico: {
        
        type: Sequelize.STRING(12),
        validate: {
            len: [3, 100]
        }
    },

//novo

    diagnostico: {
        allowNull: false,
        type: Sequelize.STRING(200),
        validate: {
            len: [3, 100]
        }
    },
    medicamento: {
        allowNull: false,
        type: Sequelize.STRING(200),
        validate: {
            len: [3, 100]
        }
    },
    exames: {
        allowNull: false,
        type: Sequelize.STRING(200),
        validate: {
            len: [3, 100]
        }
    },
    pagamento: {
       
        type: Sequelize.INTEGER
        
    },
   
    
});

module.exports = Prontuario;