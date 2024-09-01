## TypeGraphQL Schema Definition

This document provides an overview of the TypeGraphQL schema definition for the application.

### Table of Contents

* [Overview](#overview)
* [Schema Definition](#schema-definition)
* [Resolvers](#resolvers)
* [Schema Configuration](#schema-configuration)

### Overview 
This code defines a class `TypeGraphQL` responsible for generating the TypeGraphQL schema for the application. 

### Schema Definition 
The schema is built using the `buildSchema` function from the `type-graphql` package. The `buildSchema` function takes a configuration object as an argument.

### Resolvers 
The configuration object specifies the resolvers that will be used to define the GraphQL API. In this case, the following resolvers are included:

| Resolver | Description |
|---|---|
| `AdminResolver` |  Handles operations related to administrators. |
| `AnalyticsResolver` | Handles operations related to analytics data. |
| `AuthResolver` | Handles operations related to user authentication. |
| `UploadResolver` | Handles operations related to media uploads. |
| `UserResolver` | Handles operations related to users. |
| `DataDashboardResolver` | Handles operations related to data dashboards. |

### Schema Configuration 
The `buildSchema` function also accepts configuration options to customize the schema generation. 

| Configuration | Description |
|---|---|
| `dateScalarMode: "isoDate"` | Specifies the date scalar mode to use the ISO date format. |
| `validate: false` | Disables schema validation. | 
| `emitSchemaFile: false` | Prevents the schema from being written to a file. | 
