const moment = require('moment');

const isDate = ( value ) => {

    if ( !value ) {
        return false;
    }

    // se utiliza moment para convertir a fecha el valor obtenido
    const date = moment( value );

    // si la conversion falla el valor no es valido
    if( date.isValid() ) {
        return true;
    } else {
        return false;
    }

}

module.exports = { isDate }