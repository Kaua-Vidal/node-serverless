const { ItemModel } = require("../models/Item");
const { connectDataBase } = require("../config/db");


export async function updateItemService(id, updateData){
    await connectDataBase();
    const item = await ItemModel.findByIdAndUpdate(id, updateData, { new: true });

    if(!item) {
        const error = new Error("Item não encontrado no banco de dados");
        error.statusCode = 404;
        throw error;
    }

    return item;
}

module.exports = {updateItemService};