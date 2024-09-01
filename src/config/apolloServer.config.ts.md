## Apollo Server Configuration 

**Table of Contents:**

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Error Handling](#error-handling)
- [Plugins](#plugins)

### Introduction 
This code defines a class named `Apollo` that provides an asynchronous method `server` for configuring and initializing an Apollo server. The `server` method takes an `httpServer` instance as input and returns a new `ApolloServer` instance. The code utilizes the following external libraries:

* **@apollo/server**: For defining the GraphQL server.
* **@apollo/server/plugin/drainHttpServer**: For gracefully shutting down the server.
* **http**: For creating and handling HTTP requests.
* **TypeGraphQL**: For defining GraphQL schema and resolvers.
* **env.config**: For loading environment variables.
* **customFormatError**: For customizing error responses.

### Configuration

The `server` method creates an `ApolloServer` instance with the following configuration options:

| Option                 | Description                                                                                                                                                                                                                                                                                                                                            | Value                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `schema`               | The GraphQL schema to be used by the server. This is generated asynchronously using the `TypeGraphQL` class.                                                                                                                                                                                                                               | `await new TypeGraphQL().Schema()`                                                                                                |
| `csrfPrevention`       | Enables or disables Cross-Site Request Forgery (CSRF) protection.                                                                                                                                                                                                                                                                                                      | `false`                                                                                                                              |
| `introspection`        | Enables or disables introspection queries. This allows clients to inspect the schema and its types.                                                                                                                                                                                                                                                                       | `true`                                                                                                                               |
| `includeStacktraceInErrorResponses` | Includes stack traces in error responses. This is useful for debugging purposes but can expose sensitive information in production environments. It is set to `true` in development and `false` in other environments.                                                                                                                                     | `DotenvConfiguration.NODE_ENV === Environment.DEVELOPMENT ? true : false`                                                              |
| `formatError`         | A function that formats error responses before they are sent to the client. This function uses the `customFormatError` function to customize the error response.                                                                                                                                                                                            | `(formattedError, error) => { ... }`                                                                                               |
| `plugins`              | An array of plugins to use with the server. The `ApolloServerPluginDrainHttpServer` plugin is used to gracefully shut down the server when it receives a `SIGTERM` signal.                                                                                                                                                                                           | `[ApolloServerPluginDrainHttpServer({ httpServer })]`                                                                             |

### Error Handling

The `formatError` function logs the formatted error to the console and returns a custom error response using the `customFormatError` function. This approach provides a consistent error handling mechanism and ensures that sensitive information is not exposed to the client.

### Plugins

The `ApolloServerPluginDrainHttpServer` plugin is used to gracefully shut down the server when it receives a `SIGTERM` signal. This ensures that the server can handle requests properly before exiting.

This configuration enables a robust and well-configured Apollo server that can be used for various GraphQL applications. The code demonstrates best practices for error handling and server shutdown, ensuring a smooth and reliable application. 
