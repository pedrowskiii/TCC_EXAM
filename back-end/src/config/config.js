//STRING DE CONEXAO

module.exports = {
    development: {
        database: {
            host: 'localhost',
            port: 3306,
            name: 'examNodeMySQL',
            dialect: 'mysql',
            user: 'root',
            password: 'pedro123'
        }
    },
    production:{
        database: {
            host: process.env.DB_HOST,
            host: process.env.DB_PORT
        }
    }
}