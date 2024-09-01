## Logger Configuration 🪵

This document outlines the configuration of the logger used throughout the application.

### Table of Contents

- [Logger Configuration](#logger-configuration)
    - [Import Statements](#import-statements)
    - [Log Levels](#log-levels)
    - [Log Level Selection](#log-level-selection)
    - [Log Colors](#log-colors)
    - [Log Format](#log-format)
    - [Log Transports](#log-transports)
    - [Logger Instance](#logger-instance)

### Import Statements

```javascript
import winston from "winston";
import { Environment } from "../constants/enums/environment";
import dotenv from "./env.config";
```

The code imports the necessary modules:

- **winston:** The logging library.
- **Environment:** An enumeration of environments (e.g., development, production).
- **dotenv:** A module for loading environment variables from a `.env` file.

### Log Levels

```javascript
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};
```

This code defines the logging levels used in the application:

| Level | Description |
|---|---|
| `error` | Critical errors that prevent the application from functioning. |
| `warn` | Non-critical errors or potential issues that should be investigated. |
| `info` | Informational messages about the application's state. |
| `http` | Messages related to HTTP requests and responses. |
| `debug` | Detailed information for debugging purposes. |

### Log Level Selection

```javascript
const level = () => {
  const env = dotenv.NODE_ENV || Environment.DEVELOPMENT;
  const isDevelopment = env === Environment.DEVELOPMENT;
  return isDevelopment ? "debug" : "warn";
};
```

This function dynamically determines the log level based on the current environment:

- If the environment is `development`, the log level is set to `debug`.
- If the environment is not `development`, the log level is set to `warn`.

### Log Colors

```javascript
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);
```

This code assigns colors to different log levels for better visual distinction in the console output:

| Level | Color |
|---|---|
| `error` | Red |
| `warn` | Yellow |
| `info` | Green |
| `http` | Magenta |
| `debug` | White |

### Log Format

```javascript
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);
```

This code defines the format of the log messages:

- **Timestamp:** Adds a timestamp to each log message in the format "YYYY-MM-DD HH:mm:ss:ms".
- **Colorize:** Colors the log messages based on the defined colors.
- **Printf:** Formats the final log message as follows: `timestamp level: message`.

### Log Transports

```javascript
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: "log/error.log",
    level: "error",
  }),
  new winston.transports.File({ filename: "log/all.log" }),
];
```

This code defines the log transports:

- **Console:** Outputs log messages to the console.
- **File (error.log):** Writes error-level messages to a file named `error.log`.
- **File (all.log):** Writes all log messages to a file named `all.log`.

### Logger Instance

```javascript
const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default Logger;
```

This code creates a new logger instance using the configured settings:

- **Level:** The dynamically selected log level.
- **Levels:** The defined log levels.
- **Format:** The defined log message format.
- **Transports:** The defined log transports.

The `Logger` instance is exported for use throughout the application.

This configuration allows for flexible logging with different levels, colors, formats, and transports, ensuring that appropriate information is logged for debugging and troubleshooting purposes.
