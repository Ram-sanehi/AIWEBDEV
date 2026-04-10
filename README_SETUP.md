# MySQL Database Setup for AlphaAIM

This guide will help you set up the MySQL database and backend server for your Alpha Investment Management website.

## Prerequisites

- MySQL Server installed and running
- Node.js (v18 or higher)

## Step 1: Install MySQL (if not already installed)

### On Ubuntu/Debian:
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

### On Windows:
Download MySQL Installer from: https://dev.mysql.com/downloads/mysql/

### On macOS:
```bash
brew install mysql
brew services start mysql
```

## Step 2: Install Server Dependencies

```bash
cd server
npm install
```

## Step 3: Configure Database Credentials

Edit `server/.env` file with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=alphaaim_db
DB_PORT=3306
SERVER_PORT=3001
```

## Step 4: Set Up the Database

Run the database setup script:

```bash
cd server
npm run setup-db
```

Alternatively, you can manually run the SQL:

```bash
mysql -u root -p < server/db/schema.sql
```

## Step 5: Start the Backend Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:3001`

## Step 6: Update Frontend Environment (if needed)

The `.env` file is already configured with:
```env
VITE_API_URL="http://localhost:3001/api"
```

## Step 7: Start the Frontend

```bash
npm run dev
```

## Testing the Setup

1. Open your browser to `http://localhost:5173` (or your frontend dev server URL)
2. Navigate to the Contact page
3. Fill out and submit the contact form
4. Check the database to verify the submission:

```bash
mysql -u root -p -e "USE alphaaim_db; SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 5;"
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/contact` | POST | Submit contact form |
| `/api/contact` | GET | Get all submissions |
| `/api/portfolio` | POST | Save portfolio simulation |
| `/api/portfolio` | GET | Get recent simulations |
| `/api/price-alerts` | POST | Create price alert |
| `/api/price-alerts` | GET | Get active alerts |
| `/api/blog` | GET | Get all blog posts |
| `/api/blog/:id` | GET | Get single blog post |

## Troubleshooting

### Connection Refused Error
Make sure MySQL is running:
```bash
# Linux/macOS
sudo systemctl status mysql
brew services list

# Windows
Check Services → MySQL
```

### Access Denied Error
Verify your MySQL credentials in `server/.env`

### Port Already in Use
Change the `SERVER_PORT` in `server/.env` to a different port (e.g., 3002)

## Database Schema

The setup creates these tables:
- `contact_submissions` - Contact form data
- `portfolio_simulations` - Portfolio simulator history
- `price_alerts` - Price alert subscriptions
- `blog_posts` - Blog articles
