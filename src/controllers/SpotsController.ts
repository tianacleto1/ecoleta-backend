import {Request, response, Response} from 'express';
import Knex from '../database/connection';

class SpotsController {

    async getAll(req: Request, resp: Response) {
        const { city, state, items } = req.query;

        const parsedItems = String(items).split(',')
                                         .map(item => Number(item.trim()));

        const spots = await Knex('spots')
                                .join('spots_items', 'spots.id', '=', 'spots_items.spot_id')
                                .whereIn('spots_items.item_id', parsedItems)
                                .where('city', String(city))
                                .where('state', String(state))
                                .distinct()
                                .select('spots.*');

        return resp.json(spots); 
    }

    async getById(req: Request, resp: Response) {
        const { id } = req.params;

        const spot = await Knex('spots').where('id', id).first();

        if (!spot) {
            return resp.status(400).json({ message: 'Spot not found.' });
        }

        const items = await Knex('items')   
                                .join('spots_items', 'items.id', '=', 'spots_items.item_id')
                                .where('spots_items.spot_id', id)
                                .select('items.title');

        return resp.json({ spot, items });
    }

    async createSpot(req: Request, resp: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude, 
            city,
            state,
            items
        } = req.body;
    
        const trx = await Knex.transaction();
        const spot = {
            image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude, 
            city,
            state
        };
         
        const insertedIds = await trx('spots').insert(spot);
    
        const spot_id = insertedIds[0];
    
        const spotItems = items.map((item_id: Number) => {
            return {
                item_id,
                spot_id,
            };
        });
    
        await trx('spots_items').insert(spotItems);

        await trx.commit();
    
        return resp.json({ 
            id: spot_id,
            ...spot,
         });
    }
}

export default SpotsController;