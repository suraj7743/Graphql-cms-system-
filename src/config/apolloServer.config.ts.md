## Apollo Server Configuration 

**Table of Contents**

* [Overview](#overview)
* [Dependencies](#dependencies)
* [Class: Apollo](#class-apollo)
  * [Method: server](#method-server)
  

### Overview

This code defines a class `Apollo` responsible for configuring and creating an Apollo Server instance. The server uses TypeGraphQL for schema generation and includes error handling and plugin integrations.

### Dependencies

| Dependency | Description |
|---|---|
| `Environment` | Enum defining different environment types (e.g., development, production) |
| `ApolloServer` | Class from `@apollo/server` for creating GraphQL servers |
| `ApolloServerPluginDrainHttpServer` | Plugin for graceful shutdown of the HTTP server |
| `http` | Node.js module for working with HTTP servers |
| `DotenvConfiguration` | Configuration object for environment variables |
| `TypeGraphQL` | Class for configuring TypeGraphQL schema generation |
| `customFormatError` | Custom function for formatting GraphQL errors |

### Class: Apollo

The `Apollo` class provides a method `server` for creating and configuring an Apollo Server instance.

#### Method: server

The `server` method takes an `http.Server` instance as input and returns a new Apollo Server instance with the following configuration:

* **Schema:** The schema is generated using the `TypeGraphQL` class.
* **CSRF Prevention:** Disabled for simplicity.
* **Introspection:** Enabled for easier development and testing.
* **Include Stacktrace in Error Responses:** Enabled only in development environment for debugging.
* **Error Formatting:** Uses `customFormatError` function to provide a consistent error format.
* **Plugins:** Includes `ApolloServerPluginDrainHttpServer` for graceful server shutdown.

**Code Snippet:**

```typescript
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
          "\xf0\x9f\x9a\x80 ~ file: apolloServer.config.ts:22 ~ Apollo ~ server ~ formattedError:",
          formattedError
        );
        return customFormatError(formattedError);
      },
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
  }
}
```

**Explanation:**

* The `server` method is asynchronous (`async`) and takes an `http.Server` instance as input.
* It creates a new `ApolloServer` instance using the provided configuration.
* `schema: await new TypeGraphQL().Schema()` generates the GraphQL schema using TypeGraphQL.
* `csrfPrevention: false` disables CSRF protection for simplicity.
* `introspection: true` enables introspection for easier development and testing.
* `includeStacktraceInErrorResponses: DotenvConfiguration.NODE_ENV === Environment.DEVELOPMENT ? true : false` enables stacktrace inclusion in error responses only in development environment.
* `formatError: (formattedError, error) => { ... }` defines a custom error formatting function using `customFormatError`.
* `plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]` includes the `ApolloServerPluginDrainHttpServer` plugin for graceful server shutdown.

This code provides a well-structured and configurable foundation for building a GraphQL server using Apollo Server and TypeGraphQL. It includes best practices for error handling, environment-specific configuration, and server shutdown. 
