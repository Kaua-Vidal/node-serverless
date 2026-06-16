/*async getById(id){
        await connectDataBase();
        const item = await Item.findById(id);

        if(!item) {
            throw new AppError("Item não encontrado.", 404);
        }
        return item;
    }*/
import { ItemModel } from '../models/Item';
import { connectDataBase } from '../config/db'

export class getItemService{
    async execute(id) {
        await connectDataBase();

        const item = await ItemModel.findById(id);

        if (!item) {
            const error = new Error("Item não encontrado no banco de dados");
            error.statusCode = 404;
            throw error;
        }

        return item;
    }
}