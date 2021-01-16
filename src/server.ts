import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333);

// stopped at 00:58 - video 2