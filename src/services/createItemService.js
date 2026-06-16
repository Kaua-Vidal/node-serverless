import { connectDataBase } from "../config/db";
import { ItemModel } from "../models/Item";

export async function CreateItemService(data) {
  await connectDataBase();
  const newItem = new ItemModel(data);
  await newItem.save();
  return newItem;
}
