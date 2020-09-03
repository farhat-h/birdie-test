import * as express from "express";
import * as helmet from 'helmet';
import { apiController } from './controllers/api';
import { pingController } from "./controllers/ping";
const app = express();

app.use(helmet())
app.use(pingController);
app.use('/api', apiController)

app.get('*', (_, res) => {
    /** Serve the react app */
    return res.sendFile(`${__dirname}/client_build/index.html`)
})

export default app;
