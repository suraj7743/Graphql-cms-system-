# GraphQL-based CMS with Media Upload and Authentication

A modern Content Management System (CMS) built with Node.js, TypeScript, PostgreSQL, and TypeGraphQL, featuring robust media upload capabilities and role-based authentication.

## 🚀 Features

- **Authentication & Authorization**
  - User registration and login system
  - Role-based access control (Student, Teacher, Admin)
  - JWT-based authentication
  - Password change functionality
  - Admin approval system for new users

- **Media Management**
  - Single and multiple file uploads
  - Support for different media types
  - Automatic file organization
  - Temporary and permanent storage handling
  - Logo management system

- **User Management**
  - User profile management
  - Document verification (Citizenship image upload)
  - User status tracking (Under Review, Active, etc.)
  - Admin dashboard for user approval

- **Security**
  - Password hashing using bcrypt
  - JWT token management
  - Request validation middleware
  - Type-safe GraphQL operations

## 🛠 Tech Stack

- **Backend Framework**: Node.js with TypeScript
- **API**: GraphQL with TypeGraphQL
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **File Handling**: fs module with async operations
- **Email Service**: Custom email service implementation

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- TypeScript

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/suraj7743/Graphql-cms-system-.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file with the following variables:
```env
BASE_URL=your_base_url
JWT_SECRET=your_jwt_secret
TOKEN_EXPIRES_IN=24h
DATABASE_URL=your_database_url
```

4. Set up the database:
```bash
npm run typeorm migration:run
```

5. Start the server:
```bash
npm run dev
```

## 🏗 Project Structure

```
src/
├── config/           # Configuration files
├── constants/        # Enums and constant values
├── entities/         # TypeORM entities
├── middlewares/      # Authentication and validation middlewares
├── resolvers/        # GraphQL resolvers
├── schemas/          # GraphQL schemas
├── services/         # Business logic
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── validators/      # Input validation
```

## 📝 API Documentation

### User Operations

```graphql
# Register new user
mutation RegisterUser($data: RegisterUserInput!) {
  registerUser(data: $data) {
    message
    status
    user
  }
}

# User login
mutation LoginUser($data: LoginUserInput!) {
  loginUser(data: $data) {
    token
    status
    message
    user
  }
}
```

### Media Operations

```graphql
# Single file upload
mutation SingleUpload($file: Upload!, $type: MediaType!) {
  singleUpload(file: $file, type: $type) {
    id
    name
    mimeType
    type
  }
}
```

## 🔐 Authentication Flow

1. User registers with email, password, and required documents
2. Admin reviews and approves user registration
3. User can login with approved credentials
4. System generates JWT token for authenticated requests
5. Token is required for protected operations

## 👥 Role-Based Access

- **Student**: Basic access to content and personal profile
- **Teacher**: Additional privileges for content management
- **Admin**: Full system access, user management, and approval rights

## ⚙️ Configuration

The system uses various configuration files for:
- Environment variables
- Media upload settings
- Database connection
- Email templates
- Authentication rules

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token expiration
- Request validation
- Role-based middleware
- File type verification
- Secure file storage

## 📧 Email Service

The system includes an email service for:
- Registration confirmation
- User approval notifications
- Password reset
- System notifications

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
