import express from 'express'
import errorMiddleware from './utils/error-handler.js';
import logger from 'morgan'
import router from './routes/allRoutes.js';

const app = express();

// Middlewares
app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1', router);


// error handling middleware

app.use(errorMiddleware);

export default app;