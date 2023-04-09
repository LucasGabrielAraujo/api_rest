const express = require('express')
const docentesController = require('../controllers/docentes.controller')

const router = express.Router()

router.get('/', docentesController.getAllDocentes)
router.get('/:dni', docentesController.getDocenteByDni)
router.delete('/:dni', docentesController.deleteDocenteByDni)
router.post('/', docentesController.createDocente)
//router.put('/:dni', docentesController.updateDocente )

module.exports = { router}
