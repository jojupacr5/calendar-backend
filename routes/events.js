/*
  Rutas de Eventos / Events
  host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { esFecha } = require('../helpers/esFecha');

const router = Router();

// Todas las rutas deben pasar por la validacion del JWT
router.use( validateJWT );

// Obtener eventos
router.get('/', getEvents);

// Crear un nuevo evento
router.post('/', [
  check('title', 'El titulo es obligatorio').not().isEmpty(),
  check('start', 'Fecha de inicio es obligatoria').custom(esFecha),
  check('end', 'Fecha de finalización es obligatoria').custom(esFecha),
  validarCampos
], createEvent);

// Actualizar evento
router.put('/:id', updateEvent);

// Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;