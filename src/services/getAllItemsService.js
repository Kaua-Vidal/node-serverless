const { ItemModel } = require('../models/Item');
const { connectDataBase } = require('../config/db');

async function getAllItemsService(){
    await connectDataBase();

    const items = await ItemModel.find({});

    if(items.length === 0){
        const error = new Error("Itens não encontrados no banco de dados ou o banco de dados está vázio");
        error.statusCode = 404;
        throw error;
    }

    return items;
}

module.exports = { getAllItemsService };