const mongo = require('mongoose');

let isConnected = null;

const connectDataBase = async() => {
    if(isConnected) {
        console.log('=> Usando conexão existente com o MongoDB');
        return;
    };

    console.log('=> Criando NOVA conexão com o MongoDB');
    const db = await mongo.connect(process.env.MONGO_URI);

    isConnected = db.connections[0].readyState;
};

module.exports = {connectDataBase}