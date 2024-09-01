## Admins Data 

**Table of Contents**

- [Overview](#overview)
- [Data Structure](#data-structure)
- [Example Data](#example-data)

### Overview 

This code defines a list of predefined administrator users for the application. It defines a list of administrators with their respective full names, email addresses, passwords, and roles.

### Data Structure

The `Admins` variable is an array of objects, each representing an administrator user. Each object has the following properties:

| Property | Type | Description |
|---|---|---|
| `fullName` | `string` | The full name of the administrator. |
| `email` | `string` | The email address of the administrator. |
| `password` | `string` | The password of the administrator. |
| `role` | `Role` | The role of the administrator, which is defined in the `role.enum` file. |

### Example Data

The code includes one example administrator:

| Property | Value |
|---|---|
| `fullName` | Investia Admin |
| `email` | admin@gmail.com |
| `password` | Admin@123 |
| `role` | ADMIN | 
