const express = require('express');
const AtendenteController = require ('../controllers/AtendenteController.js');
const router = express.Router();

router.post('/atendentes', AtendenteController.Insert);
router.get('/atendentes', AtendenteController.SearchAll);
router.get('/atendentes/:id', AtendenteController.SearchOne);
router.put('/atendentes/:id', AtendenteController.Update);
router.delete('/atendentes/:id', AtendenteController.Delete);

module.exports = router;