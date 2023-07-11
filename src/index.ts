/** @format */

import "reflect-metadata";
import express, { Application } from "express";
import { config } from "./config";
import Routes from "./routes";
import cors from "cors";
import { container } from 'tsyringe';
import { LoggerHelper } from "./helper/logger";
import cookieParser from 'cookie-parser';
import IDatabaseConnector from "./interfaces/db-connectors.interface";
import { MongoDbConnector } from "./helper";
import mongoose from "mongoose";
import ReitAfrica, {Configuration, AuthApiFp} from "@grants-projects/reit-africa-api-client/dist"

const logger: any = container.resolve(LoggerHelper);

class Server {
  private app: Application;
  mongoConnector: IDatabaseConnector;
  constructor() {
    this.app = express();
  }

  private async setupDependencies(): Promise<void> {
    this.mongoConnector = new MongoDbConnector(mongoose);
    await this.mongoConnector.connect(config.MONGODB_URL);
  }

  checkDependencies(): void {
    if (!MongoDbConnector.getClient()) {
      throw new Error('Initialize DB!!!');
    }
  }


  public async configuration() {
    await this.setupDependencies();
    //this.app.use(response);
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(express.json());
    
    this.app.get("/", (req, res) => {
      res.status(200).json("starting...");
    });
    this.app.use("/health", (req, res) => {
      res.send({ status: "OK" });
    });
    Routes(this.app);
  }

  public async start() {
    const PORT: any = config.web.port;
    await this.configuration();
    await this.checkDependencies()
    this.app.listen(PORT, () => {
      logger.log(`Server is listening on port ${PORT}.`);
    });
  }
}
const server = new Server();
const configx: any = new Configuration();
server.start();
process.on("SIGINT", function () {
  logger.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit(1);
});
