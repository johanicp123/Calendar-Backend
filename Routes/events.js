const { Router} = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {getEvento,crearEvento,actualizarEvento,eliminarEvento} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const router = Router();

// todas tienen que pasar por la validacion JWT
router.use(validarJWT);

//obtener eventos
router.get('/', getEvento);

//crear un nuevo evento
router.post('/', 
[
    check('title','el titulo es obligatorio').not().isEmpty(),
    check('start','fecha de inicio es obligatoria').custom(isDate),
    check('end','fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
],
crearEvento);

//actualizar un evento
router.put('/:id',  
[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos
], 
actualizarEvento);

//actualizar un evento
router.delete('/:id', eliminarEvento);


module.exports = router;