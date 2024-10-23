/*
  Rutas de Eventos / Events
  host + /api/events
*/

const { Router } = require('express');
// const { check } = require('express-validator');
// const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// Todas las rutas deben pasar por la validacion del JWT
router.use( validateJWT );

// Obtener eventos
router.get('/', getEvents);

// Crear un nuevo evento
router.post('/', createEvent);

// Actualizar evento
router.put('/:id', updateEvent);

// Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;