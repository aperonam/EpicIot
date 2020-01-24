import {BigQuery} from "@google-cloud/bigquery";
import * as Influx from "influx";

class Collector {

    private influxDB: Influx.InfluxDB;
    private bigQueryClient: BigQuery;

    constructor() {
        this.bigQueryClient = new BigQuery({
            projectId: "poised-ceiling-202111",
            keyFilename: "./src/credentials.json",
        });
        this.startInflux();

    }

    public sendData(data: any) {
        console.log("Got data in collector", data);
        this.savetoDB(data);

    }

    private async uploadToBigQuery() {

        const datasetId = "sensor_data";
        const tableId = "sensor_data_table";

        const records = await this.getLastRecordsFromDB(0);
        if (records.length === 0) {
            return;
        }
        const rows = [];
        records.map((record: any) => {
            rows.push({
                sensor_id: record.sensor_id,
                timestamp: Math.floor(record.timestamp / 1000),
                type: record.type,
                value: record.value,
            });
        });
        try {
            await this.bigQueryClient
                .dataset(datasetId)
                .table(tableId)
                .insert(rows);

        } catch (e) {
            console.log("Error sending rows to bigQuery", e);
        }
        console.log(`Inserted ${rows.length} rows`);

    }

    private async savetoDB(data) {
        await this.influxDB.writePoints([
            {
                measurement: "sensor_data",
                tags: {sensor_id: data.sensor_id},
                fields: {type: data.type, value: data.value, timestamp: Date.now()},
            }]);
        const latestRecords = await this.getLastRecordsFromDB(0);
        console.log("latest records are: ", latestRecords.length);


    }

    private async getLastRecordsFromDB(timeBack: number): Promise<Influx.IResults<unknown>> {
        const currentTime: number = Math.floor(Date.now() / 1000);
        console.log("Timeback = ", currentTime - timeBack);
        return await this.influxDB.query(
                `SELECT *  FROM sensor_data where timestamp > '1579880628505'  `);

    }

    private async startInflux() {
        const influxConfig: Influx.ISingleHostConfig = {
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
        const databases = await this.influxDB.getDatabaseNames();
        if (!databases.includes(influxConfig.database)) {
            await this.influxDB.createDatabase(influxConfig.database);
        }
        // this.uploadToBigQuery();
    }

}

export const collector = new Collector();
