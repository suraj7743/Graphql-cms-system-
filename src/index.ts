import "reflect-metadata";
import app from "./config/app.config";
import dataSource from "./config/database.config";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import http from "http";
import { Apollo } from "./config/apolloServer.config";
import DotenvConfiguration from "./config/env.config";
import Print from "./utils/Print";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

const bootstrap = async () => {
  await dataSource
    .initialize()
    .then(async () => {
      const httpServer = http.createServer(app);

      const server = await new Apollo().server(httpServer);
      await server.start();
      app.use(
        bodyParser.json(),
        graphqlUploadExpress(),
        expressMiddleware(server, {
          context: async ({ req, res }) => ({
            req,
            res,
          }),
        })
      );

      httpServer.listen(DotenvConfiguration.PORT, () => {
        Print.info(
          `Server is running on http://localhost:${DotenvConfiguration.PORT}/graphql`
        );
      });
    })
    .catch((error) => {
      console.log("error ayo", error);

      Print.error(error);
    });
};
try {
  bootstrap();
} catch (error: unknown) {
  process.exit(1);
}
