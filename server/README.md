# AlphaAIM Backend Server

MySQL-based backend server for Alpha Investment Management.

## Setup Instructions

### 1. Install MySQL

Make sure MySQL is installed and running on your system.

### 2. Install Dependencies

```bash
cd server
npm install
```

### 3. Configure Database

Edit the `.env` file with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=alphaaim_db
DB_PORT=3306
SERVER_PORT=3001
```

### 4. Set Up Database

Run the database setup script to create tables and insert sample data:

```bash
npm run setup-db
```

Or manually run the SQL schema:

```bash
mysql -u root -p < db/schema.sql
```

### 5. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3001`

## API Endpoints

### Contact Form
- `POST /api/contact` - Submit contact form

### Portfolio Simulator
- `POST /api/portfolio` - Save simulation
- `GET /api/portfolio` - Get recent simulations

### Price Alerts
- `POST /api/price-alerts` - Create price alert
- `GET /api/price-alerts` - Get active alerts
- `PUT /api/price-alerts/:id/trigger` - Mark alert as triggered

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:id` - Get single blog post
- `POST /api/blog` - Create blog post (admin)
- `PUT /api/blog/:id` - Update blog post (admin)
- `DELETE /api/blog/:id` - Delete blog post (admin)

## Testing

Test the health endpoint:

```bash
curl http://localhost:3001/api/health
```
