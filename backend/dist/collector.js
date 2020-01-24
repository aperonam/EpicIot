"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bigquery_1 = require("@google-cloud/bigquery");
const Influx = __importStar(require("influx"));
class Collector {
    constructor() {
        console.log("influx", Influx);
        this.bigQueryClient = new bigquery_1.BigQuery({
            projectId: "poised-ceiling-202111",
            keyFilename: "./src/credentials.json",
        });
        this.startInflux();
    }
    sendData(data) {
        console.log("Got data in collector", data);
        this.savetoDB(data);
    }
    uploadToBigQuery() {
        return __awaiter(this, void 0, void 0, function* () {
            const datasetId = "sensor_data";
            const tableId = "sensor_data_table";
            const records = yield this.getLastRecordsFromDB(0);
            if (records.length === 0) {
                return;
            }
            const rows = [];
            records.map((record) => {
                rows.push({
                    sensor_id: record.sensor_id,
                    timestamp: Math.floor(record.timestamp / 1000),
                    type: record.type,
                    value: record.value,
                });
            });
            try {
                yield this.bigQueryClient
                    .dataset(datasetId)
                    .table(tableId)
                    .insert(rows);
            }
            catch (e) {
                console.log("Error sending rows to bigQuery", e);
            }
            console.log(`Inserted ${rows.length} rows`);
        });
    }
    savetoDB(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.influxDB.writePoints([
                {
                    measurement: "sensor_data",
                    tags: { sensor_id: data.sensor_id },
                    fields: { type: data.type, value: data.value, timestamp: Date.now() },
                }
            ]);
            const latestRecords = yield this.getLastRecordsFromDB(0);
            console.log("latest records are: ", latestRecords.length);
        });
    }
    getLastRecordsFromDB(timeBack) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTime = Math.floor(Date.now() / 1000);
            console.log("Timeback = ", currentTime - timeBack);
            return yield this.influxDB.query(`SELECT *  FROM sensor_data where timestamp > '1579880628505'  `);
        });
    }
    startInflux() {
        return __awaiter(this, void 0, void 0, function* () {
            const influxConfig = {
                database: "IoT",
                host: "localhost",
                schema: [
                    {
                        fields: {
                            type: Influx.FieldType.STRING,
                            timestamp: Influx.FieldType.INTEGER,
                            value: Influx.FieldType.FLOAT,
                        },
                        measurement: "sensor_data",
                        tags: [
                            "sensor_id",
                        ],
                    },
                ],
            };
            this.influxDB = new Influx.InfluxDB(influxConfig);
            const databases = yield this.influxDB.getDatabaseNames();
            if (!databases.includes(influxConfig.database)) {
                yield this.influxDB.createDatabase(influxConfig.database);
            }
            // this.uploadToBigQuery();
        });
    }
}
exports.collector = new Collector();
//# sourceMappingURL=collector.js.map