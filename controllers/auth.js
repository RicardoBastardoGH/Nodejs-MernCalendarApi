const { response, json } = require('express');
const bcrypt = require ('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const register = async (req,res = response) => {

    const { name, email, password } = (req.body);

    try {
        // buscando en la bd si existe un usuario con ese email
        let user = await User.findOne({ email: email });

        if ( user ){
            return res.status(400).json({
                ok: false,
                msg: 'Email is already registered'
            })
        }

        user = new User( req.body );

        // encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        //Guardar en la BD
        await user.save();

        // login
        // Gernerar JWT
        const token = await generateJWT( user.id, user.name );

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Please, Comunicate with the Admintrator'
        });
    }


}

const login =  async (req,res = response) => {

    const { email, password } = (req.body);

    try {
        
        let user = await User.findOne({ email: email });

        if ( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'Email is not registered'
            })
        }

        // Comparar passwords
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            });
        }

        //Generar JWT
        const token = await generateJWT( user.id, user.name );

        res.json({
            ok: true,
            uid: user.id, 
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Please, Comunicate with the Admintrator'
        });
    }

 

}

const renewToken = async (req,res = response) => {

    const { uid, name } = req;

    // generar nuevo JWT y retornarlo en la peticion
    const token = await generateJWT( uid, name );

    res.json({
        ok: true,
        token
    })

} 

module.exports = {
    register,
    login,
    renewToken
}