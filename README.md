# Password Management System

A comprehensive password management and authentication system built with TypeScript, Express, and Firebase. This system provides secure credential storage, password strength validation, and user management features.

## Features

### User Authentication
- User registration
- Secure login system with password hashing
- Account blocking after failed login attempts
- Password expiration management
- Email notifications for password expiration
- User blocking system for expired passwords

### Password Management
- Secure storage of credentials for multiple services
- Password strength validation with comprehensive criteria:
  - Minimum length of 8 characters
  - Check for sequential numbers
  - Prevention of repetitive characters
  - Username inclusion check
  - Variety of character types (uppercase, lowercase, numbers, special characters)
  - Common password pattern detection
- Automatic strong password generation
- Password update functionality with validation
- Visual password strength indicator

### Credential Management
- Store credentials for multiple services
- View stored credentials in a secure dashboard
- Update stored credentials
- Remove stored credentials
- Show/hide password toggle for stored credentials
- Timestamp tracking for credential creation and updates

### Security Features
- Bcrypt password hashing
- Firebase Realtime Database integration
- Email notifications via nodemailer
- Password policy enforcement
- Automatic account blocking for security breaches

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)
- Firebase account with Realtime Database setup
- Gmail account for email notifications

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Guyr14/credentialsManager.git
cd credentialsManager
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project
   - Set up Realtime Database
   - Copy your Firebase configuration to `firebase-config.ts`
   - Set up Firebase Admin SDK and update `firebase-admin.ts`

4. Configure email notifications:
   - Update the email configuration in `mailManager.ts` with your Gmail credentials

5. Build the project:
```bash
npm run build
```

## Running the Application

1. Start the server:
```bash
npm start
```

2. The application will automatically open in your default browser at `http://localhost:8080`


## Project Structure

- `src/` - Source code directory
  - `server.ts` - Express server setup and API routes
  - `index.ts` - Main application logic
  - `passwordUtils.ts` - Password-related utilities
  - `credentialDatabaseActions.ts` - Database operations for credentials
  - `databaseActions.ts` - General database operations
  - `mailManager.ts` - Email notification system
  - `User.ts` - User model definition
  - `StoredCredential.ts` - Credential model definition
  - `validation.ts` - Input validation utilities
  - `Utils.ts` - Common utilities
  - `public/` - Static files
    - `index.html` - Login/Register page
    - `dashboard.html` - User dashboard

## Security Considerations

1. Password Requirements:
   - Minimum 8 characters
   - Must include uppercase and lowercase letters
   - Must include numbers
   - Must include special characters
   - Cannot contain sequential numbers
   - Cannot contain repeated characters
   - Cannot contain username
   - Cannot be common passwords

2. Account Security:
   - Accounts are blocked after configureable number of failed login attempts
   - Passwords expire after a configurable time period
   - Email notifications for password expiration
   - Automatic account blocking for expired passwords

3. Data Security:
   - All passwords are hashed using bcrypt
   - Firebase security rules implementation
   - HTTPS enforcement
   - Input sanitization

## API Endpoints

### Authentication
- `POST /login` - User login
- `POST /register` - User registration
- `POST /update-password` - Password update

### Credential Management
- `POST /api/credentials` - Add new credential
- `GET /api/credentials/:userName` - Get user's credentials
- `DELETE /api/credentials/:userName/:serviceName` - Remove credential
- `PUT /api/credentials/:userName/:serviceName` - Update credential

### Password Utilities
- `POST /check-password-strength` - Check password strength
- `GET /generate-password` - Generate strong password

## Configuration

The system uses several configuration constants in `Utils.ts`:
- `TIME_TO_NOTIFICATION`: Time before password expiration notification (default: 60000ms)
- `TIME_TO_BLOCK`: Time before account blocking after notification (default: 60000ms)
- `ATTEMPTS_UNTIL_BLOCKED`: Maximum login attempts (default: 3)

## Error Handling

The system includes comprehensive error handling for:
- Invalid login attempts
- Password validation failures
- Database operation failures
- Email notification failures
- Input validation errors