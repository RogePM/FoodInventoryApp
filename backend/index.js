import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
// import {FoodItem}  from './models/FoodItemModel.js';
import foodsRoute from './routes/foodsRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

//Middleware for CORS
app.use(cors());

//option 2 for CORS
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         credentials: true,
//     })
// );


app.use('/foods', foodsRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App is connected to MongoDB');
        const port = process.env.PORT || PORT;
        app.listen(port, () => {
            console.log(`App is listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.log('THeres an error', error);
    });
