import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from "./routes";
import path from "path";


const app: Express = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors({origin: '*', credentials: true}));
app.use(bodyParser.json());
app.use("", router);



export default app;
