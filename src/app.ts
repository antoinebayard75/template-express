import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from "./routes";
import path from "path";
import ErrorMiddleware from "./middlewares/errorMiddleware";


const app: Express = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors({origin: '*', credentials: true}));
app.use(bodyParser.json());
app.use("", router);
app.use(ErrorMiddleware)




export default app;
