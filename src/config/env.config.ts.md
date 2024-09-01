## Dotenv Configuration 

**Table of Contents**

| Section | Description | 
|---|---|
| [Environment Configuration](#environment-configuration) | Details on how to configure the environment variables. |
| [DotenvConfiguration Class](#dotenvconfiguration-class) | Definition of the `DotenvConfiguration` class and its properties. |

### Environment Configuration

This code uses the `dotenv` package to load environment variables from a `.env` file. The `.env` file should be located in the root directory of the project.

- **Loading the `.env` file:** The code uses `dotenv.config()` to load the `.env` file.
- **Specifying the `.env` file path:** The `path` parameter of `dotenv.config()` is set to `path.resolve(process.cwd(), ".env")`. This ensures that the `.env` file is loaded from the project root directory.

### DotenvConfiguration Class

The `DotenvConfiguration` class provides a convenient way to access environment variables throughout the application.

**Properties**

| Property | Description | Type |
|---|---|---|
| `NODE_ENV` | Environment mode (e.g., development, production). | `string` |
| `PORT` | Application port. | `number` |
| `APP_NAME` | Application name. | `string` |
| `BASE_URL` | Base URL of the application. | `string` |
| `DATABASE_HOST` | Hostname of the database server. | `string` |
| `DATABASE_PORT` | Port of the database server. | `number` |
| `DATABASE_USERNAME` | Username for the database. | `string` |
| `DATABASE_PASSWORD` | Password for the database. | `string` |
| `DATABASE_NAME` | Name of the database. | `string` |
| `MAIL_USERNAME` | Username for the email service. | `string` |
| `MAIL_PASSWORD` | Password for the email service. | `string` |
| `MAIL_FROM` | Default sender email address. | `string` |
| `MAIL_HOST` | Hostname of the email server. | `string` |
| `MAIL_PORT` | Port of the email server. | `number` |
| `REDIS_PORT` | Port of the Redis server. | `number` |
| `REDIS_HOST` | Hostname of the Redis server. | `string` |
| `REDIS_PASSWORD` | Password for the Redis server. | `string` |
| `DEBUG_MODE` | Flag to enable/disable debug mode. | `boolean` |
| `JWT_SECRET` | Secret key for JWT authentication. | `string` |
| `TOKEN_EXPIRES_IN` | Time in seconds for token expiration. | `string` |

**Usage**

To access a specific environment variable, use the class name and the property name:

```javascript
import DotenvConfiguration from "./dotenv-configuration";

// Get the database host
const databaseHost = DotenvConfiguration.DATABASE_HOST;

// Check if debug mode is enabled
const isDebugMode = DotenvConfiguration.DEBUG_MODE;
```

**Note:** The code uses the non-null assertion operator (`!`) to access environment variables that are expected to be defined. It is important to ensure that all required environment variables are set in the `.env` file. If a required variable is missing, the application will throw an error. 
