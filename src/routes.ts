import express from 'express';
import Knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (req, resp) => {
    const items = await Knex('items').select('*');

    const serializedItems = items.map(items => {
        return { 
            name: items.title,
            image_url: `http://localhost:3333/uploads/${items.image}`,
         };
    });

    return resp.json(serializedItems);
});

export default routes;