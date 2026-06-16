const { connectDataBase } = require('../config/db');
const Item = require('../models/Item');
const AppError = require('../errors/AppError')

class ItemService {
    async create(itemData) {
        await connectDataBase();
        return await Item.create(itemData);
    }

    async getAll(){
        await connectDataBase();
        return await Item.find({});
    }

    async getById(id){
        await connectDataBase();
        const item = await Item.findById(id);

        if(!item) {
            throw new AppError("Item não encontrado.", 404);
        }
        return item;
    }

    async update(id, updateData){
        await connectDataBase();
        const updatedItem = await Item.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!updatedItem) {
            throw new AppError("Item não encontrado.", 404);
        }
        return updatedItem;
    }

    async delete(id){
        await connectDataBase();
        const deletedItem = await Item.findByIdAndDelete(id);

        if(!deletedItem){
            throw new AppError("Item não encontrado.", 404);
        }
        return deletedItem;
    }
}

module.exports = new ItemService();