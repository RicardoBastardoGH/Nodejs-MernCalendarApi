/* 
    Rutas de Eventos
    host + /api/events
*/

const express = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fileds-validator')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/event');
const { JWTValidator } = require('../middlewares/jwt-validator');
const { isDate } = require('../helpers/isDate');

const router = express.Router();

// Aplicando Middelware a todas las rutas
router.use( JWTValidator );

// Todas tienen que pasar por la validacion del token
// obtener eventos
router.get('/', getEvents);

// Crear evento
router.post(
    '/',
    [
        check('title','Title is required').not().isEmpty(),
        check('start','Start date is required').custom( isDate ),
        check('end','End date is required').custom( isDate ),
        fieldsValidator
    ], 
    createEvent);

// Actualizar evento
router.put('/:id' , updateEvent );

// Borrar evento
router.delete('/:id' , deleteEvent );

module.exports = router;