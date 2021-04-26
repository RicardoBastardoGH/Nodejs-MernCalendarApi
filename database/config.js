const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.DB_CONECTION , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error initiating Database');
    }
}

module.exports = {
    dbConnection
}