## Logger 🪵

This document provides an overview of the logger implementation.

### Table of Contents

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Usage](#usage)

### Introduction

This code implements a logging system using the `winston` library. The logger is configured to log messages to the console and to file. 

### Configuration

The logger is configured to use the following:

- **Levels:** 
    - `error`: 0 
    - `warn`: 1 
    - `info`: 2 
    - `http`: 3 
    - `debug`: 4
- **Level:** The log level is determined by the environment. If the environment is set to `development`, the log level is set to `debug`. Otherwise, the log level is set to `warn`.
- **Colors:** The logger uses colors to distinguish between different log levels.
- **Format:** The logger uses the following format for log messages:
    - `[timestamp]` `[level]` `[message]`

### Usage

The logger is exported as a default export. It can be used in other parts of the application as follows:

```javascript
import Logger from "./logger";

// Log an error message
Logger.error("An error occurred.");

// Log a warning message
Logger.warn("A warning occurred.");

// Log an info message
Logger.info("An info message.");

// Log a debug message
Logger.debug("A debug message.");
```

### Notes

- The logger writes error logs to `log/error.log` and all logs to `log/all.log`.
- The `dotenv` package is used to load environment variables from the `.env` file.
- The `Environment` enum is used to define the different environments.
