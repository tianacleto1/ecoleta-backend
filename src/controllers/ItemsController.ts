import { Request, Response } from 'express';
import Knex from '../database/connection';

class ItemsController {
    
    async getAllItems(req: Request, resp: Response) {
        const items = await Knex('items').select('*');
    
        const serializedItems = items.map(items => {
            return { 
                id: items.id,
                title: items.title,
                image_url: `http://localhost:3333/uploads/${items.image}`,
             };
        });
    
        return resp.json(serializedItems);
    }
}

export default ItemsController;