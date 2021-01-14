import express from 'express';

const app = express();

app.get('/users', (req, resp) => {
    console.log('Users List...');

    resp.json([
        'James',
        'Anders',
        'Louis',
        'Robert'
    ]);
});

app.listen(3333);

// stopped at 01:22