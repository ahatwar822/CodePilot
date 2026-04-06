import express from 'express'
import errorMiddleware from './utils/error-handler.js';
import logger from 'morgan'

const app = express();

// Middlewares
app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World!');
});


// error handling middleware

app.use(errorMiddleware);

export default app;