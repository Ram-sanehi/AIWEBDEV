# AlphaAIM - AI-Powered Financial Advisory Platform

A comprehensive financial advisory platform with investment tools, portfolio simulation, and market analysis features.

## 🚀 Features

- **Contact Management** - Store and manage user inquiries
- **Blog System** - Financial education content
- **Portfolio Simulator** - Simulate investment scenarios
- **Price Alerts** - Track stock price movements
- **SIP Calculator** - Systematic Investment Plan calculations
- **Risk Analyzer** - Assess investment risk profiles
- **Responsive Design** - Modern UI with Tailwind CSS

## 🛠️ Tech Stack

**Frontend:**
- React 18+ with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations

**Backend:**
- Node.js with Express
- MySQL database
- RESTful API architecture

## 📋 Prerequisites

- Node.js 18+
- MySQL Server 8+
- npm or bun package manager

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd server
npm install
```

### 2. Setup MySQL Database

```bash
cd server
bash setup-complete.sh
```

### 3. Configure Environment Variables

Create `.env` file in the root and `server/.env` with your configuration:

```env
# Frontend (.env)
VITE_API_URL="http://localhost:3001/api"

# Backend (server/.env)
DB_HOST="localhost"
DB_USER="alphaaim_user"
DB_PASSWORD="AlphaAIM@User2024!App"
DB_NAME="alphaaim_db"
SERVER_PORT=3001
```

### 4. Start Development Server

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd server
npm start
```

Visit `http://localhost:5173` to access the application.

## 📁 Project Structure

```
alphaaim.in/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── api/            # API integration
│   ├── lib/            # Utility functions
│   ├── hooks/          # Custom hooks
│   └── styles/         # Global styles
├── server/
│   ├── db/             # Database configuration
│   ├── routes/         # API endpoints
│   ├── index.js        # Server entry point
│   └── package.json
├── public/             # Static assets
└── package.json
```

## 🔌 API Endpoints

### Health Check
```bash
GET /api/health
```

### Contact Form
```bash
POST /api/contact
GET /api/contact
```

### Blog
```bash
GET /api/blog
GET /api/blog/:id
POST /api/blog
```

### Portfolio
```bash
POST /api/portfolio
GET /api/portfolio
```

### Price Alerts
```bash
POST /api/price-alerts
GET /api/price-alerts
PUT /api/price-alerts/:id/trigger
```

## 💾 Database Setup

The MySQL database includes 4 main tables:

- **contact_submissions** - User inquiry forms
- **blog_posts** - Financial articles and guides
- **portfolio_simulations** - Investment simulations
- **price_alerts** - Price monitoring configurations

See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed database documentation.

## 📱 Usage

### Submit Contact Form
```javascript
await fetch('http://localhost:3001/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "User",
    email: "user@example.com",
    phone: "1234567890",
    subject: "Inquiry",
    message: "Your message"
  })
});
```

## 🔒 Security

- Environment variables for sensitive data
- Input validation on all endpoints
- SQL prepared statements to prevent injection
- CORS enabled for API endpoints

## 🚀 Deployment

For production deployment:

1. Update `.env` with production database credentials
2. Build frontend: `npm run build`
3. Deploy to hosting service (Vercel, Netlify, etc.)
4. Deploy backend to server (AWS, Heroku, DigitalOcean, etc.)
5. Configure CORS for your domain

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

Contributions are welcome! Please feel free to submit any PRs or open issues.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
