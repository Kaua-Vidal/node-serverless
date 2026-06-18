const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);

let isConnected = null;

const connectDataBase = async() => {
    if(mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
        console.log('=> Usando conexão existente com o MongoDB');
        return;
    };

    console.log('=> Criando NOVA conexão com o MongoDB');

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao MongoDB com sucesso!")
    } catch (error) {
        console.error("Erro ao conectar no MongoDB: ", error.message);
        throw error;
    }

};

module.exports = {connectDataBase};