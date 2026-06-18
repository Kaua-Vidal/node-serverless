const { ItemModel } = require("../models/Item");
const { connectDataBase } = require("../config/db");

async function getItemService(id) {
  await connectDataBase();

  const item = await ItemModel.findById(id);

  if (!item) {
    const error = new Error("Item não encontrado no banco de dados");
    error.statusCode = 404;
    throw error;
  }

  return item;
}

module.exports = { getItemService };
