import express, { response } from 'express';
import Knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (req, resp) => {
    const items = await Knex('items').select('*');

    const serializedItems = items.map(items => {
        return { 
            id: items.id,
            title: items.title,
            image_url: `http://localhost:3333/uploads/${items.image}`,
         };
    });

    return resp.json(serializedItems);
});

routes.post('/spots', async (req, resp) => {
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

     
    const insertedIds = await trx('spots').insert({
        image: 'fake-image',
        name,
        email,
        whatsapp,
        latitude,
        longitude, 
        city,
        state
    });

    const spot_id = insertedIds[0];

    const spotItems = items.map((item_id: Number) => {
        return {
            item_id,
            spot_id,
        };
    });

    await trx('spots_items').insert(spotItems);

    return resp.json({ success: true });
});

export default routes;