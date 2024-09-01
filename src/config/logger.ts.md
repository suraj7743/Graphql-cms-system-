## Logger Configuration 

**Table of Contents**

- [Introduction](#introduction)
- [Configuration](#configuration)
  - [Levels](#levels)
  - [Log Level](#log-level)
  - [Colors](#colors)
  - [Format](#format)
  - [Transports](#transports)

### Introduction 

This code defines a logger configuration using the `winston` library for logging purposes in a Node.js application. The logger is designed to handle different log levels, format log messages, and write logs to both the console and files.

### Configuration

#### Levels

The logger utilizes the following log levels:

| Level | Description |
|---|---|
| `error` | Indicates an error condition. |
| `warn` | Indicates a warning. |
| `info` | Provides general information about the application. |
| `http` | Logs HTTP requests and responses. |
| `debug` | Provides detailed debugging information. |

#### Log Level

The log level for the logger is dynamically set based on the environment:

- If the environment is `development`, the log level is set to `debug`.
- If the environment is not `development`, the log level is set to `warn`.

The environment variable `NODE_ENV` is used to determine the current environment. If it's not set, the default environment is set to `development`.

#### Colors

The logger utilizes colors to visually distinguish different log levels:

| Level | Color |
|---|---|
| `error` | Red |
| `warn` | Yellow |
| `info` | Green |
| `http` | Magenta |
| `debug` | White |

#### Format

The log messages are formatted to include the timestamp, level, and message content. The format is configured as follows:

- **Timestamp:**  Uses `YYYY-MM-DD HH:mm:ss:ms` format.
- **Colorize:**  Applies colors to the log levels.
- **Printf:**  Formats the log message using the provided template.

#### Transports

The logger uses the following transports to write logs:

- **Console:**  Writes logs to the console.
- **File (error.log):**  Writes error logs to the `error.log` file.
- **File (all.log):**  Writes all logs to the `all.log` file. 
