const express = require('express');
const MedicoController = require ('../controllers/MedicoController.js');
const router = express.Router();

router.post('/medicos', MedicoController.Insert);
router.get('/medicos', MedicoController.SearchAll);
router.get('/medicos/:id', MedicoController.SearchOne);
router.put('/medicos/:id', MedicoController.Update);
router.delete('/medicos/:id', MedicoController.Delete);

module.exports = router;