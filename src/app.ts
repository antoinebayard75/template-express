import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from "./routes";


const app: Express = express();

app.use(cors({origin: '*', credentials: true}));
app.use(bodyParser.json());
app.use("", router);



export default app;
