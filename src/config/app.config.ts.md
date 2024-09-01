##  Server Initialization 🚀

### Table of Contents 📑

- [Introduction](#introduction)
- [Code Breakdown](#code-breakdown)
  - [Import Statements](#import-statements)
  - [App Initialization](#app-initialization)
  - [Middleware Application](#middleware-application)
  - [App Export](#app-export)

### Introduction 

This code snippet is responsible for initializing the server application. It sets up the Express framework, applies middleware, and exports the initialized app for use in other parts of the project.

### Code Breakdown

#### Import Statements 📥

```javascript
import express from "express";
import middlewares from "../middlewares";
```

- This section imports the necessary dependencies:
  - `express`: The Express framework, used to create and manage the web server.
  - `middlewares`: A module containing middleware functions that will be applied to the server.

#### App Initialization 🏗️

```javascript
const app = express();
```

- This line initializes a new Express application instance, assigning it to the variable `app`.

#### Middleware Application 🛡️

```javascript
middlewares(app);
```

- This line applies the middleware functions imported from the `middlewares` module to the Express app. Middleware functions can be used for tasks such as logging requests, authenticating users, and handling errors.

#### App Export 📤

```javascript
export default app;
```

- This line exports the initialized Express app as the default export of the module. This allows other parts of the project to access and use the server.
