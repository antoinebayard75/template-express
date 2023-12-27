import dotenv from "dotenv";
import "reflect-metadata";
import app from "./app";
import {onServerStart} from "./utils/onServerStart";

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => onServerStart(port));
