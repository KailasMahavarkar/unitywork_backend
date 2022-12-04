import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import './env';
import publicRoutes from './routes/publicRoutes';
import privateRoutes from './routes/privateRoutes';

import connect from './connect';
import _authToken from './middlewares/_authToken';
import cors from 'cors';


// create express instance
const app = express();

// set json limit
app.use(express.json({ limit: "1mb" }));
app.set('json spaces', 4);
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    res.locals = {
        'x-api-key': '',
        'x-dev-key': '',
        controls: {
            prev: 0,
            next: 0,
            total: 0,
            limit: 0,
            page: 0,
        }
    }

    return next();
})


// base route for landing page
app.get("/", (req, res) => {
    return res.send({
        message: "Welcome to the Buddy API",
        version: "1.0.0"
    })
})


app.use('/', publicRoutes);
app.use('/', privateRoutes);


// catch all route
app.get("*", (req, res) => {
    return res.status(404).send({
        message: "Route not found"
    })
})


// listen server to port
const PORT = process.env.PORT || 2000;
app.listen(PORT, async () => {
    console.log(`server is listening to port ${PORT}`);
    await connect();
})

