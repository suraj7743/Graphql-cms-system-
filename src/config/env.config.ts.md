## Dotenv Configuration 

**Table of Contents:**

* [Introduction](#introduction)
* [Configuration Variables](#configuration-variables)

### Introduction 

This file implements a `DotenvConfiguration` class that handles loading environment variables from a `.env` file using the `dotenv` package. This class provides a centralized way to access all application configuration parameters. 

**Prerequisites:**

* Node.js
* dotenv package (`npm install dotenv`)

### Configuration Variables

| Variable Name | Description | Type | Default |
|---|---|---|---|
| `NODE_ENV` | Environment mode (development, production, etc.) | String |  |
| `PORT` | Application port | Number |  |
| `APP_NAME` | Application name | String |  |
| `BASE_URL` | Base URL of the application | String |  |
| `DATABASE_HOST` | Database host address | String |  |
| `DATABASE_PORT` | Database port | Number |  |
| `DATABASE_USERNAME` | Database username | String |  |
| `DATABASE_PASSWORD` | Database password | String |  |
| `DATABASE_NAME` | Database name | String |  |
| `MAIL_USERNAME` | Email server username | String |  |
| `MAIL_PASSWORD` | Email server password | String |  |
| `MAIL_FROM` | Default email sender address | String |  |
| `MAIL_HOST` | Email server host | String |  |
| `MAIL_PORT` | Email server port | Number |  |
| `REDIS_PORT` | Redis server port | Number |  |
| `REDIS_HOST` | Redis server host address | String |  |
| `REDIS_PASSWORD` | Redis server password | String |  |
| `DEBUG_MODE` | Enable/disable debug mode | Boolean |  |
| `JWT_SECRET` | Secret key for JWT authentication | String |  |
| `TOKEN_EXPIRES_IN` | Token expiration time (in seconds) | String |  |


**Usage:**

To access a configuration variable, simply use the `DotenvConfiguration` class and its static properties. For example:

```javascript
// Get the application port
const port = DotenvConfiguration.PORT;

// Get the database host
const databaseHost = DotenvConfiguration.DATABASE_HOST;

// Check if debug mode is enabled
const isDebugMode = DotenvConfiguration.DEBUG_MODE;
```

**Important Notes:**

* Make sure to create a `.env` file in your project root directory and populate it with the required environment variables.
* **DO NOT** commit the `.env` file to your version control system.
* Use the `process.env` object to access environment variables directly. However, it's recommended to use the `DotenvConfiguration` class for a more structured and organized approach.