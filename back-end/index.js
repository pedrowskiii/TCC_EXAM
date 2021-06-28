const http = require('http');
const express = require('express');
const status = require ('http-status');
const sequelize = require ('./src/database/database');
const app = express();
//const routes = require ('./src/routes/routes.js');
const routesatendentes = require ('./src/routes/atendenterouter.js');
const routesmedicos = require ('./src/routes/medicorouter.js');
const routesprontuario = require ('./src/routes/prontuariorouter.js');
const routescliente = require ('./src/routes/clienterouter.js');
const cors = require('cors');

app.use(express.json());

app.use(cors());

//app.use('/sistema', routes);
app.use('/sistema', routesatendentes);
app.use('/sistema', routesmedicos);
app.use('/sistema', routesprontuario);
app.use('/sistema', routescliente);



app.use((req, res, next) => {
    res.status.apply(status.NOT_FOUND).send("Page not found");
});

app.use((req, res, next) => {
    res.status.apply(status.INTERNAL_SERVER_ERROR).json({error});
});

sequelize.sync({force: false}).then( () => {
    const port = 3003;
    app.set("port", port);
    const server = http.createServer(app);
    server.listen(port);
});