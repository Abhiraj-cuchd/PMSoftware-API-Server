import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import _config from './config/secrets';
import router from './routes';

// ROUTE IMPORTS



// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.get('/', (req: Request, res: Response) => {
    res.send("Backend is Running")
})

app.use('/api/v1', router)


const server = () => {
    app.listen(_config.PORT, () => {
        console.log(`Server running at Port: ${_config.PORT}`);
    })
};

server();
