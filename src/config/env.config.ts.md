## Dotenv Configuration

**Table of Contents**

* [Introduction](#introduction)
* [Import Statements](#import-statements)
* [DotenvConfiguration Class](#dotenvconfiguration-class)
    * [Node Environment Variables](#node-environment-variables)
    * [Server Information](#server-information)
    * [Database Configurations](#database-configurations)
    * [Email Configuration](#email-configuration)
    * [Redis Configurations](#redis-configurations)
    * [Other Configurations](#other-configurations)

### Introduction 

This code snippet defines a class called `DotenvConfiguration` which encapsulates all the environment variables required for the application. It leverages the `dotenv` library to load environment variables from a `.env` file.

### Import Statements

```javascript
import dotenv from "dotenv";
import path from "path";
```

* **`dotenv`:** This import brings in the `dotenv` library, which is used to load environment variables from a `.env` file.
* **`path`:** This import brings in the `path` library, used to resolve the path to the `.env` file.

### DotenvConfiguration Class

The `DotenvConfiguration` class defines static properties for each environment variable.  These properties are accessed directly from the class itself.

```javascript
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

class DotenvConfiguration {
  // ...
}

export default DotenvConfiguration;
```

* **`dotenv.config`:** This statement configures the `dotenv` library to load environment variables from the `.env` file located at the root of the project.
* **`export default DotenvConfiguration`:** This line makes the `DotenvConfiguration` class available for use in other parts of the application.

#### Node Environment Variables

```javascript
  static NODE_ENV = process.env.NODE_ENV;
  static PORT = +process.env.PORT!;
  static APP_NAME = process.env.APP_NAME;
```

* **`NODE_ENV`:** Stores the current node environment (e.g., 'development', 'production').
* **`PORT`:** Stores the port number for the application server. The `+` operator converts the string value from the environment variable to a number.
* **`APP_NAME`:** Stores the name of the application.

#### Server Information

```javascript
  static BASE_URL = process.env.BASE_URL!;
```

* **`BASE_URL`:** Stores the base URL for the application.

#### Database Configurations

```javascript
  static DATABASE_HOST = process.env.DATABASE_HOST;
  static DATABASE_PORT = +process.env.DATABASE_PORT!;
  static DATABASE_USERNAME = process.env.DATABASE_USERNAME;
  static DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
  static DATABASE_NAME = process.env.DATABASE_NAME;
```

* **`DATABASE_HOST`:** Stores the hostname of the database server.
* **`DATABASE_PORT`:** Stores the port number for the database server.
* **`DATABASE_USERNAME`:** Stores the username for connecting to the database.
* **`DATABASE_PASSWORD`:** Stores the password for connecting to the database.
* **`DATABASE_NAME`:** Stores the name of the database.

#### Email Configuration

```javascript
  static MAIL_USERNAME = process.env.MAIL_USERNAME;
  static MAIL_PASSWORD = process.env.MAIL_PASSWORD;
  static MAIL_FROM = process.env.MAIL_FROM;
  static MAIL_HOST = process.env.MAIL_HOST;
  static MAIL_PORT = +process.env.MAIL_PORT!;
```

* **`MAIL_USERNAME`:** Stores the username for the email service.
* **`MAIL_PASSWORD`:** Stores the password for the email service.
* **`MAIL_FROM`:** Stores the default email address used for sending emails.
* **`MAIL_HOST`:** Stores the hostname of the email server.
* **`MAIL_PORT`:** Stores the port number for the email server.

#### Redis Configurations

```javascript
  static REDIS_PORT = process.env.REDIS_PORT!;
  static REDIS_HOST = process.env.REDIS_HOST!;
  static REDIS_PASSWORD = process.env.REDIS_PASSWORD!;
```

* **`REDIS_PORT`:** Stores the port number for the Redis server.
* **`REDIS_HOST`:** Stores the hostname of the Redis server.
* **`REDIS_PASSWORD`:** Stores the password for the Redis server.

#### Other Configurations

```javascript
  static DEBUG_MODE = Boolean(process.env.DEBUG_MODE);
  static JWT_SECRET = process.env.JWT_SECRET!;
  static TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN?.toString()!
}
```

* **`DEBUG_MODE`:** Stores a boolean value indicating whether debug mode is enabled.
* **`JWT_SECRET`:** Stores the secret key used for generating and verifying JWTs.
* **`TOKEN_EXPIRES_IN`:** Stores the expiration time for JWTs. 
