## Admins Data Model

### Table of Contents
- [Introduction](#introduction)
- [Data Structure](#data-structure)
- [Data Examples](#data-examples)

### Introduction 

This file defines the initial data for the `Admins` array, used for managing administrative users in the application.

### Data Structure

The `Admins` array contains objects representing individual administrator accounts. Each object has the following properties:

| Property Name | Data Type | Description |
|---|---|---|
| `fullName` | String | The full name of the administrator. |
| `email` | String | The email address of the administrator. |
| `password` | String | The password of the administrator. |
| `role` | Role | The role of the administrator, defined in the `Role` enum. |

### Data Examples

The `Admins` array is initialized with the following data:

| Property Name | Value |
|---|---|
| `fullName` | Investia Admin |
| `email` | admin@gmail.com |
| `password` | Admin@123 |
| `role` | ADMIN | 
