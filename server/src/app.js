import express from 'express'
import errorMiddleware from './middlewares/error.middleware.js';
import logger from 'morgan'
import router from './routes/allRoutes.js';
import cookieparser from 'cookie-parser'
import { notFound } from './utils/response.utils.js';

const app = express();

// Middlewares
app.use(logger("tiny"));
app.use(express.json({ limit: '10mb' }));
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1', router);

//handling 404 not found
app.use((req, res) => {
  return notFound(res, {
    ip: req.ip,
    method: req.method,
    url: `${req.protocol}://${req.get("host")}${req.originalUrl} `,
  });
});


// error handling middleware

app.use(errorMiddleware);

export default app;