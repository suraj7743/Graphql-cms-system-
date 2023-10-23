import { Environment } from "../constants/enums/environment";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import DotenvConfiguration from "./env.config";
import { TypeGraphQL } from "./typeGraphQL.config";
import customFormatError from "../utils/errors/customFormatError";

export class Apollo {
  async server(
    httpServer: http.Server<
      typeof http.IncomingMessage,
      typeof http.ServerResponse
    >
  ) {
    return new ApolloServer({
      schema: await new TypeGraphQL().Schema(),
      csrfPrevention: false,
      introspection: true,
      // DotenvConfiguration.NODE_ENV === Environment.DEVELOPMENT ? true : false,
      includeStacktraceInErrorResponses:
        DotenvConfiguration.NODE_ENV === Environment.DEVELOPMENT ? true : false,
      formatError: (formattedError, error) => {
        console.log(
          "🚀 ~ file: apolloServer.config.ts:22 ~ Apollo ~ server ~ formattedError:",
          formattedError
        );
        return customFormatError(formattedError);
      },
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
  }
}
