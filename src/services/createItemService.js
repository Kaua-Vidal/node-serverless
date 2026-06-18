const { connectDataBase } = require("../config/db");
const { ItemModel } = require("../models/Item");

async function createItemService(data) {
  
  await connectDataBase();
  const newItem = new ItemModel(data);
  await newItem.save();
  return newItem;
}

module.exports = { createItemService };
