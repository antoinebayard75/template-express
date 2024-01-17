import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from "./routes";
import ErrorMiddleware from "./middlewares/errorMiddleware";
import Global from "./global";


const app: Express = express();

app.use(`/${Global.MEDIA_FOLDER_NAME}`, express.static(Global.MEDIA_ABSOLUTE_PATH))
app.use(cors({origin: '*', credentials: true}));
app.use(bodyParser.json());
app.use(Global.DEFAULT_ROUTE, router);
app.use(ErrorMiddleware)



export default app;
