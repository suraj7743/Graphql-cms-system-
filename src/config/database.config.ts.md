##  Database Configuration - AppDataSource 

**Table of Contents**

| Section | Description |
|---|---|
|  [Introduction](#introduction) | Overview of the AppDataSource module |
| [Imports](#imports) | Dependencies required for the module |
| [DataSource Configuration](#datasource-configuration) |  Configuration settings for the database connection |
| [Export](#export) |  Exporting the AppDataSource object |

---

### Introduction 

This module defines the `AppDataSource` object, which is used to connect to the application's PostgreSQL database. It utilizes TypeORM for data persistence and provides a centralized configuration point for database interactions. 

### Imports

The code begins by importing necessary libraries:

| Import | Description |
|---|---|
| `import "reflect-metadata";` |  Imports the `reflect-metadata` package. This package is required by TypeORM to enable metadata reflection for entity class definitions. | 
| `import { DataSource } from "typeorm";` | Imports the `DataSource` class from TypeORM. This class is used to create a connection to the database. |
| `import env from "./env.config";` | Imports the `env.config` module. This module is responsible for loading environment variables, such as database connection details. |

### DataSource Configuration

The `AppDataSource` is instantiated with the following configuration options:

| Property | Value | Description |
|---|---|---|
| `type` | `"postgres"` | Specifies the database type. In this case, it is PostgreSQL. |
| `host` | `env.DATABASE_HOST` | The host address of the PostgreSQL server. |
| `port` | `+env.DATABASE_PORT` | The port number of the PostgreSQL server. The `+` operator converts the string value from the environment variable to a number. |
| `username` | `env.DATABASE_USERNAME` | The username for accessing the PostgreSQL database. |
| `password` | `env.DATABASE_PASSWORD` | The password for accessing the PostgreSQL database. |
| `database` | `env.DATABASE_NAME` | The name of the PostgreSQL database to connect to. |
| `synchronize` | `true` | Indicates whether TypeORM should synchronize the database schema with the entity definitions. This should generally be set to `false` in production environments to avoid data loss. |
| `logging` | `false` |  Determines whether TypeORM should log database queries to the console.  |
| `entities` | `[`${__dirname}/../entities/**/*{.ts,.js}`]` |  An array specifying the path to the directory containing the entity classes. The `/**/*{.ts,.js}` pattern matches all TypeScript and JavaScript files in the entities directory. |
| `subscribers` | `[]` |  An array specifying the subscribers to register. Subscribers are classes that can listen to events emitted by TypeORM, such as entity events. |
| `migrations` | `[]` | An array specifying the migration files. Migrations are used to manage changes to the database schema. |
| `dropSchema` | `false` |  Indicates whether TypeORM should drop the database schema before creating it. This is typically only used for development purposes. |

### Export

The `AppDataSource` object is exported as the default export of the module. This makes it available for use in other parts of the application. 
