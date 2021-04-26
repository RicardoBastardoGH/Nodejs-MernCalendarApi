const { response } = require('express');
const jwt = require('jsonwebtoken');

const JWTValidator = ( req, res = response, next ) => {

    // x-token en los headers
    const token = req.header('x-token');

    if ( !token ) {
        res.status(401).json({
            ok: false,
            msg: 'There is no Token in the request'
        });
    }

    try {
        
        const { uid, name }  = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )

        req.uid = uid;  
        req.name = name; 

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        });
    }

    next();

}

module.exports = {
    JWTValidator
}