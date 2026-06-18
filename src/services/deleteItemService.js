
const { ItemModel } = require('../models/Item');
const { connectDataBase } = require('../config/db');

async function deleteItemService(id) {
    await connectDataBase();

    const itemDeleted = await ItemModel.findByIdAndDelete(id);

    if(!itemDeleted){
        const error = new Error("Item não encontrado.");
        error.statusCode = 404;
        throw error;
    }
    return itemDeleted;
}

module.exports = { deleteItemService };