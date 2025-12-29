# 🚀 Quick Start Guide - AI Teacher Assistant

Welcome to the AI Teacher Assistant! This guide will help you get the application running in minutes.

## Prerequisites Checklist

Before starting, ensure you have:
- [ ] Node.js 18 or higher (`node --version`)
- [ ] MongoDB 6 or higher (or MongoDB Atlas account)
- [ ] OpenAI API Key ([Get one here](https://platform.openai.com/api-keys))
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

## 🎯 Option 1: Quick Start (Recommended for Testing)

### Step 1: Clone and Setup
```bash
# Clone the repository
git clone https://github.com/abhishekgautam95/ai-teacher-assistant.git
cd ai-teacher-assistant
```

### Step 2: Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file and add:
# - Your OpenAI API key
# - MongoDB connection string (use local or Atlas)
# Example:
# OPENAI_API_KEY=sk-your-key-here
# MONGODB_URI=mongodb://localhost:27017/ai-teacher-assistant
```

### Step 3: Start MongoDB
```bash
# Option A: If you have MongoDB installed locally
mongod

# Option B: Use MongoDB Atlas (cloud)
# 1. Create free cluster at https://www.mongodb.com/cloud/atlas
# 2. Get connection string
# 3. Add to .env file
```

### Step 4: Start Backend Server
```bash
# In backend directory
npm run dev

# You should see:
# ✅ MongoDB connected successfully
# 🚀 Server running on port 5000
```

### Step 5: Frontend Setup (New Terminal)
```bash
# Navigate to frontend from project root
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# You should see:
# ➜  Local:   http://localhost:5173/
```

### Step 6: Access Application
Open your browser and navigate to:
```
http://localhost:5173
```

You should see the login page!

## 🎯 Option 2: Docker Setup (Recommended for Production)

### Step 1: Prerequisites
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Ensure Docker is running

### Step 2: Configuration
```bash
# Clone repository
git clone https://github.com/abhishekgautam95/ai-teacher-assistant.git
cd ai-teacher-assistant

# Copy and edit environment file
cp .env.example .env

# Edit .env and add your OpenAI API key:
# OPENAI_API_KEY=sk-your-key-here
# JWT_SECRET=your-secure-secret-key
```

### Step 3: Start with Docker Compose
```bash
# Start all services (MongoDB, Backend, Frontend)
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Step 4: Access Application
```
Frontend: http://localhost:5173
Backend API: http://localhost:5000
MongoDB: mongodb://localhost:27017
```

## 📝 First Time Usage

### 1. Create Account
1. Click "Register" on the login page
2. Fill in your details:
   - Name: Your name
   - Email: Your email
   - Password: Strong password (min 6 characters)
   - Role: Select "Teacher"
3. Click "Create Account"

### 2. Login
1. Use your email and password
2. You'll be redirected to the dashboard

### 3. Generate Your First Question Paper
1. Click "Question Paper Generator" card
2. Fill in the form:
   - Board: CBSE
   - Class: 10
   - Subject: Mathematics
   - Chapter: "Quadratic Equations"
   - Difficulty: Medium
3. Click "Generate"
4. Wait 10-15 seconds for AI to generate questions
5. Download as PDF!

### 4. Create Notes
1. Click "Notes Generator" card
2. Fill in details
3. Click "Generate"
4. Export as PowerPoint!

## ⚠️ Common Issues & Solutions

### Issue 1: "Cannot connect to MongoDB"
**Solution:**
- Ensure MongoDB is running: `mongod` (or check MongoDB Atlas)
- Check MONGODB_URI in .env file
- Verify port 27017 is not in use

### Issue 2: "OpenAI API Error"
**Solution:**
- Verify OPENAI_API_KEY in .env is correct
- Check you have credits in your OpenAI account
- Ensure no extra spaces in the API key

### Issue 3: "Port 5000 already in use"
**Solution:**
```bash
# Kill process on port 5000
# On Mac/Linux:
lsof -ti:5000 | xargs kill -9

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue 4: "Module not found" errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 5: Frontend build errors
**Solution:**
```bash
# Clear cache and rebuild
npm run build -- --force
```

## 🔧 Development Tips

### Backend Development
```bash
# Watch mode (auto-restart on changes)
cd backend
npm run dev

# Build TypeScript
npm run build

# Production mode
npm start
```

### Frontend Development
```bash
# Development mode with hot reload
cd frontend
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Viewing Logs
```bash
# Backend logs show:
# - API requests
# - Database connections
# - AI service calls
# - Errors

# Frontend logs show:
# - Component renders
# - API calls
# - User interactions
```

## 📱 Testing Features

### Test Question Generation
1. Go to Question Generator
2. Use these test inputs:
   - Board: CBSE
   - Class: 10
   - Subject: Science
   - Chapter: "Light - Reflection and Refraction"
   - Difficulty: Easy

### Test Language Toggle
1. Click the language button in header
2. Switch between English and Hindi
3. Notice UI text changes
4. Generate content in Hindi

### Test Authentication
1. Logout
2. Try to access /dashboard directly
3. You should be redirected to login
4. Login again to access protected routes

## 🎓 Sample Data

### Sample Users for Testing
```javascript
Teacher Account:
- Email: teacher@test.com
- Password: teacher123
- Role: Teacher

Admin Account:
- Email: admin@test.com
- Password: admin123
- Role: Admin
```

### Sample Question Paper Input
```
Board: CBSE
Class: 9
Subject: Mathematics
Chapter: "Linear Equations in Two Variables"
Difficulty: Medium
Language: English
```

## 📊 Monitoring & Logs

### Check Application Health
```bash
# Backend health check
curl http://localhost:5000/health

# Expected response:
{
  "status": "ok",
  "timestamp": "2024-12-29T...",
  "environment": "development"
}
```

### Database Connection
```bash
# Connect to MongoDB
mongo mongodb://localhost:27017/ai-teacher-assistant

# View collections
show collections

# Count users
db.users.count()
```

## 🚀 Deployment Checklist

When ready to deploy:
- [ ] Update all API keys in production .env
- [ ] Set NODE_ENV=production
- [ ] Use strong JWT_SECRET
- [ ] Configure MongoDB Atlas
- [ ] Setup CORS for production domain
- [ ] Enable SSL/HTTPS
- [ ] Configure CDN for frontend assets
- [ ] Setup monitoring (e.g., Sentry)
- [ ] Configure backup strategy for MongoDB

## 📚 Additional Resources

- **Full Documentation**: See [DOCUMENTATION.md](DOCUMENTATION.md)
- **API Reference**: See [README.md](README.md#api-endpoints)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)
- **Changelog**: See [CHANGELOG.md](CHANGELOG.md)

## 💡 Pro Tips

1. **API Key Security**: Never commit .env files to Git
2. **Development**: Use different databases for dev and prod
3. **Testing**: Generate questions in English first to verify setup
4. **Performance**: Clear browser cache if UI seems slow
5. **Updates**: Pull latest changes regularly with `git pull`

## 🆘 Getting Help

If you encounter issues:
1. Check this Quick Start Guide
2. Review [DOCUMENTATION.md](DOCUMENTATION.md)
3. Search existing GitHub Issues
4. Create new issue with:
   - Error message
   - Steps to reproduce
   - Environment details (OS, Node version, etc.)

## ✅ Success Checklist

You're ready to use the app when:
- [ ] Backend server running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] MongoDB connected successfully
- [ ] Can register new account
- [ ] Can login successfully
- [ ] Can generate question paper
- [ ] Can generate notes
- [ ] Can switch languages

---

**Need Help?** Open an issue on [GitHub](https://github.com/abhishekgautam95/ai-teacher-assistant/issues)

**Ready to Contribute?** Read [CONTRIBUTING.md](CONTRIBUTING.md)

**Enjoying the app?** ⭐ Star the repository!
