import * as express from "express";
import { apiController } from './controllers/api';
import { pingController } from "./controllers/ping";

const app = express();

app.use(pingController);
app.use('/api', apiController)

export default app;
