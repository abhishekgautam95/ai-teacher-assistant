# AI Teacher Assistant

Production-ready AI-powered teaching assistant application for Indian schools (Class 6-12). Supports CBSE, UP Board, and State Boards.

## 🎯 Features

### Core Features
- **🔹 Smart Question Paper Generator**: Generate custom question papers with MCQs, short answer, and long answer questions aligned with Bloom's Taxonomy
- **🔹 Notes & PPT Generator**: Create student-friendly notes and PowerPoint presentations
- **🔹 AI Answer Sheet Checking**: OCR-based answer sheet evaluation with AI feedback
- **🔹 Student Performance Dashboard**: Track progress with analytics and insights
- **🔹 Teacher Assistant Tools**: Lesson plans, homework ideas, and activity suggestions

### Supported Boards & Subjects
- **Boards**: CBSE, UP Board, Maharashtra State Board, Bihar Board
- **Classes**: 6-12
- **Subjects**: Mathematics, Science, English, Hindi, Social Science, Computer Science
- **Languages**: English, Hindi

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (routing)
- i18next (internationalization)
- Axios (HTTP client)
- Zustand (state management)
- React Hot Toast (notifications)
- jsPDF (PDF generation)

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- OpenAI GPT-4 API
- Tesseract.js (OCR)
- PDFKit (PDF generation)
- pptxgenjs (PowerPoint generation)
- Multer (file uploads)
- Express Validator (validation)
- Rate Limiting

### DevOps
- Docker & Docker Compose
- Environment-based configuration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- Docker & Docker Compose (optional, for containerized deployment)
- OpenAI API Key

## 🚀 Getting Started

### Option 1: Manual Setup

#### 1. Clone the repository
```bash
git clone https://github.com/abhishekgautam95/ai-teacher-assistant.git
cd ai-teacher-assistant
```

#### 2. Setup Backend
```bash
cd backend
npm install
cp ../.env.example .env
# Edit .env and add your MONGODB_URI, JWT_SECRET, and OPENAI_API_KEY
npm run dev
```

#### 3. Setup Frontend (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

#### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/health

### Option 2: Docker Setup

#### 1. Setup Environment Variables
```bash
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY and JWT_SECRET
```

#### 2. Start with Docker Compose
```bash
docker-compose up -d
```

#### 3. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔑 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-teacher-assistant
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (frontend/.env)
```env
VITE_API_URL=http://localhost:5000
```

## 📁 Project Structure

```
ai-teacher-assistant/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── context/        # React context
│   │   ├── i18n/           # Internationalization
│   └── package.json
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Configuration
│   │   ├── models/         # Mongoose models
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   ├── services/       # Business logic
│   │   └── server.ts       # Entry point
│   └── package.json
├── docker-compose.yml       # Docker setup
└── README.md               # This file
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
1. Register a new account at `/register`
2. Login at `/login`
3. Token is stored in localStorage
4. All API requests include the token in the Authorization header

### User Roles
- **Teacher**: Generate questions, notes, check answers
- **Admin**: All teacher permissions + manage users
- **Student**: View-only access

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Question Papers
- `POST /api/questions` - Generate question paper
- `GET /api/questions` - List all question papers
- `GET /api/questions/:id` - Get single question paper
- `GET /api/questions/:id/export` - Export as PDF
- `DELETE /api/questions/:id` - Delete question paper

### Notes
- `POST /api/notes` - Generate notes
- `GET /api/notes` - List all notes
- `GET /api/notes/:id` - Get single note
- `GET /api/notes/:id/export` - Export as PPT
- `DELETE /api/notes/:id` - Delete notes

### Answer Sheets
- `POST /api/answers` - Upload and check answer sheet
- `GET /api/answers` - List all answer sheets
- `GET /api/answers/:id` - Get single answer sheet
- `PUT /api/answers/:id` - Update evaluation

### Performance
- `POST /api/performance` - Create performance record
- `GET /api/performance` - List performance records
- `GET /api/performance/student/:id` - Get student analytics
- `GET /api/performance/:id/export` - Export report as PDF

## 🎨 UI/UX Features

- Mobile-first responsive design (320px - 1920px)
- Hindi/English language toggle
- Clean, card-based dashboard
- Loading states and error handling
- Toast notifications
- Professional color scheme

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Secure file upload validation

## 📊 Database Schema

### Collections
- **Users**: Teacher, admin, and student accounts
- **QuestionPapers**: Generated question papers
- **Notes**: Generated study notes
- **AnswerSheets**: Uploaded and evaluated answer sheets
- **StudentPerformance**: Performance tracking and analytics

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📝 License

This project is licensed under the MIT License.

---

**Built with ❤️ for Indian Teachers**