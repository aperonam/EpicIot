import bodyParser from "body-parser";
import express from "express";

import {collector} from "./collector";

const app = express();
app.use(bodyParser.json());

const port = 3001;
app.post("/data", (req, res) => {
    collector.sendData(req.body);
});
app.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
