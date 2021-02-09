import express, { response } from 'express';

import SpotsController from './controllers/SpotsController';
import ItemsController from './controllers/ItemsController'; 

const routes = express.Router();
const spotsController = new SpotsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.getAllItems);

routes.post('/spots', spotsController.createSpot);
routes.get('/spots', spotsController.getAll);
routes.get('/spots/:id', spotsController.getById);

export default routes;