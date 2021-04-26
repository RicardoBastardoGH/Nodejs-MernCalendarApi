/* 
    Rutas de usuarios
    host + /api/auth
*/

const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); //middelware validar campos
const { register, login, renewToken } = require('../controllers/auth');
const { fieldsValidator } = require('../middlewares/fileds-validator');
const { JWTValidator } = require('../middlewares/jwt-validator')

router.post(
    '/register',
    [   // middlewares
        check('name','Name is required').not().isEmpty(),
        check('email','Email is required').isEmail(),
        check('password','Password should contain at least 6 characters').isLength({min:6}),
        fieldsValidator
    ], 
    register );

router.post(
    '/login', 
    [
        check('email','Email is required').isEmail(),
        check('password','Password should contain at least 6 characters').isLength({min:6}),
        fieldsValidator
    ], 
    login );
// renew JWT    
router.get('/renew', JWTValidator , renewToken);

module.exports = router;