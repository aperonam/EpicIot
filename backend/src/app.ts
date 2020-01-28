import bodyParser from "body-parser";
import express from "express";

import {collector} from "./collector";

const app = express();
app.use(bodyParser.json());

const port = 3001;
app.post("/data", (req, res) => {
    collector.sendData(req.body);
});
app.get("/data/:sensorId/:type", async (req, res) => {
   const record =  await collector.getLastValueFromDB(req.params.sensorId, req.params.type);
   console.log()
   res.send(record[0]["last_value"].toString())
});
app.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
