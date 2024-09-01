## Apollo Server Configuration 

**Table of Contents**
* [Overview](#overview)
* [Dependencies](#dependencies)
* [Apollo Class](#apollo-class)
    * [server Method](#server-method)

### Overview

This file defines the configuration for the Apollo Server. 

### Dependencies

| Dependency | Description |
|---|---|
| `Environment` |  Enum containing the different environments for the application. |
| `ApolloServer` | Apollo Server class. |
| `ApolloServerPluginDrainHttpServer` | Plugin for draining the HTTP server. |
| `http` | Node.js HTTP module. |
| `DotenvConfiguration` | Configuration for environment variables. |
| `TypeGraphQL` | TypeGraphQL configuration class. |
| `customFormatError` | Function for formatting errors. |

### Apollo Class

The `Apollo` class provides the functionality for creating an Apollo Server instance.

#### server Method

```typescript
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
          "\xf0\x9f\x9a\x80 ~ file: apolloServer.config.ts:22 ~ Apollo ~ server ~ formattedError:",
          formattedError
        );
        return customFormatError(formattedError);
      },
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
  }
```

This method takes an HTTP server as an argument and returns a new Apollo Server instance. 

**Key Configurations:**

| Configuration | Description |
|---|---|
| `schema` | The GraphQL schema for the application. |
| `csrfPrevention` |  Whether to enable CSRF prevention.  Set to `false` for this implementation. |
| `introspection` |  Whether to enable introspection. Set to `true` for this implementation. |
| `includeStacktraceInErrorResponses` | Whether to include the stacktrace in error responses. This is only enabled in development mode. |
| `formatError` | Custom error formatter. This logs the error to the console and then calls `customFormatError` to format the error for the client. |
| `plugins` |  Array of plugins for the Apollo Server. This implementation uses the `ApolloServerPluginDrainHttpServer` plugin to drain the HTTP server. |

**Notes:**

* The `includeStacktraceInErrorResponses` option is only set to `true` in development mode to help with debugging.
* The `formatError` function logs the error to the console before formatting it for the client. This can be helpful for debugging.
* The `ApolloServerPluginDrainHttpServer` plugin is used to gracefully shutdown the HTTP server when the Apollo Server is closed.
