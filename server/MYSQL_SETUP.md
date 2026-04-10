# MySQL Database Setup for AlphaAIM

This project uses MySQL as the database for storing form submissions and other data.

## Prerequisites
- MySQL Server installed and running
- Node.js installed

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Initialize MySQL Database
Run the setup script to create the database, user, and tables:

```bash
npm run setup-db
```

This script will:
- Create a MySQL database called `alphaaim_db`
- Create a user `alphaaim_user` with password `alphaaim_secure_password_2024`
- Create all necessary tables (contact_submissions, portfolio_simulations, price_alerts, blog_posts)
- Insert sample blog posts

### 3. Start the Server
```bash
npm start
```

Or for development with hot reload:
```bash
npm run dev
```

## Database Configuration

The following environment variables can be configured in `.env`:

```
DB_HOST=localhost          # MySQL host
DB_USER=alphaaim_user      # MySQL user
DB_PASSWORD=alphaaim_secure_password_2024  # MySQL password
DB_NAME=alphaaim_db        # Database name
SERVER_PORT=3001           # Server port
```

## Tables

### contact_submissions
Stores contact form submissions from users.

**Columns:**
- `id` (VARCHAR 36) - UUID primary key
- `name` (VARCHAR 255) - Sender name
- `email` (VARCHAR 255) - Sender email
- `phone` (VARCHAR 20) - Sender phone number
- `subject` (VARCHAR 255) - Message subject
- `message` (TEXT) - Message content
- `status` (VARCHAR 50) - Status (default: 'pending')
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

### portfolio_simulations
Stores portfolio simulation data.

### price_alerts
Stores price alert configurations.

### blog_posts
Stores blog post content.

## API Endpoints

### Health Check
```
GET /api/health
```

### Contact Form
```
POST /api/contact
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "subject": "Inquiry",
  "message": "Hello, I have a question..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully"
}
```

### Get All Contact Submissions
```
GET /api/contact
```

## Troubleshooting

### Connection Error
If you get "Access denied for user", make sure:
1. MySQL server is running
2. Run `npm run setup-db` to create the user and database
3. Check the credentials in `.env` file

### Database not found
If you get "Unknown database 'alphaaim_db'":
1. Run `npm run setup-db` to create the database

### Permission Issues
If you get permission errors:
1. Make sure the MySQL user has proper privileges
2. Run `npm run setup-db` again to reset permissions
