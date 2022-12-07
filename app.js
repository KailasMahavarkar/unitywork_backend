const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const publicRoutes = require("./routes/publicRoutes");
const privateRoutes = require("./routes/privateRoutes");


const connect = require('./connect');
const cors = require('cors');
const compression = require('compression');


// create express instance
const app = express();

// set json limit
app.use(express.json({ limit: "1mb" }));
app.set('json spaces', 4);
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// use compression
app.use(compression());

// handle json error
app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
        return res.status(400).json({
            msg: "failed to parse JSON body",
            status: "failed"
        })
    } else {
        return next();
    }
});

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

