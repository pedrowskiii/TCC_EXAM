const express = require('express');
const ProntuarioController = require ('../controllers/ProntuarioController.js');
const router = express.Router();

router.post('/prontuarios', ProntuarioController.Insert);
router.get('/prontuarios', ProntuarioController.SearchAll);
router.get('/prontuarios/:id', ProntuarioController.SearchOne);
router.put('/prontuarios/:id', ProntuarioController.Update);
router.delete('/prontuarios/:id', ProntuarioController.Delete);

module.exports = router;