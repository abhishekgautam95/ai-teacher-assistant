# AI Teacher Assistant - Project Documentation

## Overview
AI Teacher Assistant is a production-ready full-stack application designed to reduce teacher workload and improve teaching quality for Indian schools supporting Classes 6-12 across CBSE, UP Board, and State Boards.

## Architecture

### System Design
```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  React Frontend │◄───────►│  Express Backend│◄───────►│    MongoDB      │
│   (Port 5173)   │         │   (Port 5000)   │         │   (Port 27017)  │
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
                                     │
                                     │
                                     ▼
                            ┌─────────────────┐
                            │                 │
                            │  OpenAI GPT-4   │
                            │   Tesseract.js  │
                            │                 │
                            └─────────────────┘
```

### Technology Stack

#### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Routing**: React Router DOM v6
- **State Management**: React Context API + Zustand
- **HTTP Client**: Axios
- **Internationalization**: i18next, react-i18next
- **Notifications**: React Hot Toast
- **PDF Generation**: jsPDF
- **Form Handling**: Native React with validation

#### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express 4
- **Language**: TypeScript 5
- **Database**: MongoDB 7 with Mongoose 8
- **Authentication**: JWT + bcrypt
- **AI Integration**: OpenAI GPT-4
- **OCR**: Tesseract.js 5
- **Document Generation**: PDFKit, pptxgenjs
- **File Upload**: Multer
- **Validation**: express-validator
- **Security**: express-rate-limit, CORS

#### DevOps
- **Containerization**: Docker & Docker Compose
- **Environment Management**: dotenv
- **Version Control**: Git

## Project Structure

```
ai-teacher-assistant/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and environment config
│   │   ├── models/          # Mongoose schemas
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── services/        # Business logic & external services
│   │   ├── utils/           # Helper functions
│   │   └── server.ts        # Entry point
│   ├── uploads/             # File upload directory
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── i18n/            # Translations (en, hi)
│   │   ├── utils/           # Helper functions
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── public/
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
├── LICENSE
├── CONTRIBUTING.md
└── CHANGELOG.md
```

## Core Features

### 1. Smart Question Paper Generator
- **Input**: Board, Class, Subject, Chapter, Difficulty, Language
- **AI Processing**: OpenAI GPT-4 generates curriculum-aligned questions
- **Output**: 
  - 5 MCQs (1 mark each)
  - 3 Short Answer Questions (2-3 marks each)
  - 2 Long Answer Questions (5 marks each)
- **Bloom's Taxonomy Alignment**: Remember, Understand, Apply, Analyze levels
- **Export**: PDF format

### 2. Notes & PPT Generator
- **Input**: Board, Class, Subject, Chapter, Language
- **AI Processing**: GPT-4 generates student-friendly notes
- **Features**:
  - Bullet points with examples
  - Key concepts and definitions
  - Diagram suggestions
- **Export**: PowerPoint (PPTX) format

### 3. AI Answer Sheet Checking
- **Process**:
  1. Upload scanned answer sheet (image)
  2. OCR extraction (Tesseract.js)
  3. AI evaluation against model answer
  4. Generate marks and feedback
- **Output**:
  - Marks awarded
  - Constructive feedback
  - Topic-wise mistake analysis

### 4. Student Performance Dashboard
- **Metrics**:
  - Test-wise performance tracking
  - Topic-wise analysis
  - Strong vs weak topics identification
  - Progress over time
- **Visualizations**: Charts (Recharts library ready)
- **Export**: PDF performance reports

### 5. Multi-language Support
- **Languages**: English, Hindi
- **Implementation**: i18next with language toggle
- **Persistence**: localStorage
- **Coverage**: Complete UI and generated content

## Database Schema

### Users Collection
```typescript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  phone: String,
  password: String (hashed with bcrypt),
  role: 'teacher' | 'admin' | 'student',
  school_id: ObjectId,
  subjects: [String],
  classes: [Number] (6-12),
  language_preference: 'en' | 'hi',
  subscription_tier: 'free' | 'premium' | 'school',
  trial_ends_at: Date,
  created_at: Date,
  updated_at: Date
}
```

### QuestionPapers Collection
```typescript
{
  _id: ObjectId,
  teacher_id: ObjectId (ref: User),
  board: String,
  class: Number (6-12),
  subject: String,
  chapter: String,
  difficulty: 'easy' | 'medium' | 'hard',
  questions: [{
    type: 'mcq' | 'short' | 'long',
    question: String,
    options: [String],
    answer: String,
    marks: Number,
    bloom_level: String
  }],
  total_marks: Number,
  duration: Number (minutes),
  created_at: Date
}
```

### StudentPerformance Collection
```typescript
{
  _id: ObjectId,
  student_id: ObjectId (ref: User),
  subject: String,
  test_name: String,
  marks_obtained: Number,
  total_marks: Number,
  topic_wise_performance: [{
    topic: String,
    marks: Number,
    total: Number
  }],
  feedback: String,
  checked_by: ObjectId (ref: User),
  checked_at: Date,
  created_at: Date
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Question Papers
- `POST /api/questions` - Generate question paper (Teacher/Admin)
- `GET /api/questions` - List all question papers (Teacher/Admin)
- `GET /api/questions/:id` - Get single question paper
- `GET /api/questions/:id/export` - Export as PDF
- `DELETE /api/questions/:id` - Delete question paper (Teacher/Admin)

### Notes
- `POST /api/notes` - Generate notes (Teacher/Admin)
- `GET /api/notes` - List all notes (Teacher/Admin)
- `GET /api/notes/:id` - Get single note
- `GET /api/notes/:id/export` - Export as PPT
- `DELETE /api/notes/:id` - Delete notes (Teacher/Admin)

### Answer Sheets
- `POST /api/answers` - Upload and check answer sheet (Teacher/Admin)
- `GET /api/answers` - List all answer sheets (Teacher/Admin)
- `GET /api/answers/:id` - Get single answer sheet
- `PUT /api/answers/:id` - Update evaluation (Teacher/Admin)

### Performance
- `POST /api/performance` - Create performance record (Teacher/Admin)
- `GET /api/performance` - List performance records
- `GET /api/performance/student/:id` - Get student analytics
- `GET /api/performance/:id/export` - Export report as PDF

## Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Protected Routes**: Middleware-based route protection
- **Role-Based Access**: Teacher, Admin, Student roles

### API Security
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend origin
- **Input Validation**: express-validator for all inputs
- **File Upload Security**: 
  - Type validation (images, PDFs only)
  - Size limits (10MB default)
  - Sanitized filenames

### Data Security
- **No Sensitive Data Exposure**: Passwords excluded from responses
- **Environment Variables**: All secrets in .env
- **Error Handling**: Generic error messages to clients

## Deployment

### Local Development

1. **Prerequisites**:
   - Node.js 18+
   - MongoDB 6+
   - OpenAI API Key

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Docker Deployment

```bash
# Copy and configure environment
cp .env.example .env
# Edit .env with OpenAI API key and JWT secret

# Start all services
docker-compose up -d

# Access application
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
# MongoDB: mongodb://localhost:27017
```

### Production Deployment

#### Frontend (Vercel)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL`

#### Backend (Railway/Render)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables from .env.example

#### Database (MongoDB Atlas)
1. Create cluster
2. Get connection string
3. Update MONGODB_URI in backend environment

## Performance Optimization

### Frontend
- Code splitting with React.lazy
- Image optimization
- Lazy loading for routes
- Memoization for expensive computations
- Service Worker ready (PWA capable)

### Backend
- Database indexing on frequently queried fields
- Connection pooling
- Caching strategies ready
- Efficient query pagination

## Future Enhancements

### Phase 2 Features
- [ ] WhatsApp integration for notifications
- [ ] Bulk student import/export
- [ ] Advanced analytics dashboards
- [ ] Parent portal
- [ ] Calendar integration
- [ ] Attendance tracking

### Phase 3 Features
- [ ] Mobile app (React Native)
- [ ] Voice input support
- [ ] Video lesson integration
- [ ] Gamification features
- [ ] AI-powered doubt resolution
- [ ] Live class integration

## Support Boards & Subjects

### Educational Boards
- CBSE (Central Board of Secondary Education)
- UP Board (Uttar Pradesh State Board)
- Maharashtra State Board
- Bihar Board
- Extensible to other state boards

### Subjects
- Mathematics
- Science (Physics, Chemistry, Biology)
- English
- Hindi
- Social Science
- Computer Science

### Classes
- 6 to 12 (Middle and High School)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for GPT-4 API
- Tesseract.js for OCR capabilities
- MongoDB for database
- All open-source contributors

---

**Built with ❤️ for Indian Teachers**
