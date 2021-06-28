const express = require('express');
const ClienteController = require ('../controllers/ClienteController.js');
const router = express.Router();

router.post('/clientes', ClienteController.Insert);
router.get('/clientes', ClienteController.SearchAll);
router.get('/clientes/:id', ClienteController.SearchOne);
router.put('/clientes/:id', ClienteController.Update);
router.delete('/clientes/:id', ClienteController.Delete);

module.exports = router;