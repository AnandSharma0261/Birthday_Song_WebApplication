# 🎵 My Birthday Song - AI-Powered Personalized Birthday Song Generator

A complete full-stack web application that generates personalized birthday songs using AI. Users can register, provide song preferences, and generate custom lyrics with AI-powered text-to-speech playback.

## 🌟 Features

- **User Registration & OTP Verification** (Mock OTP: 1234)
- **Personal Details Collection** (Name, Age, Gender)
- **Song Preferences Selection** (Mood, Genre, Voice)
- **AI-Powered Lyrics Generation** (ChatGPT API integration)
- **Text-to-Speech Audio Playback** (ElevenLabs.io integration)
- **Responsive Mobile-First Design**
- **Real-time Progress Tracking**

## 🛠️ Tech Stack

### Frontend
- **React.js** with **TypeScript**
- **Vite** (Build Tool)
- **React Router** (Navigation)
- **Axios** (HTTP Client)
- **CSS3** (Custom Styling)

### Backend
- **Node.js** with **TypeScript**
- **Express.js** (Web Framework)
- **MongoDB/Mongoose** (Database)
- **OpenAI API** (ChatGPT for lyrics)
- **ElevenLabs API** (Text-to-Speech)
- **CORS** enabled

## 📱 Design Implementation

The UI exactly matches the provided design screenshots:
1. **Landing Page** - Hero section with call-to-action
2. **Registration** - Phone, Name, Email with T&C
3. **OTP Verification** - 4-digit OTP input (Demo: 1234)
4. **Personal Details** - Receiver info collection
5. **Preferences** - Mood, Genre, Voice selection
6. **Lyrics Display** - AI-generated lyrics with audio playback

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (optional - uses in-memory storage if not available)

### 1. Clone and Setup Backend

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create `.env` file in backend directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
PORT=3001
MONGODB_URI=mongodb://localhost:27017/birthday-song-app
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

### 4. Start Development Servers

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

### 5. Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## 🔑 API Integration Setup

### ChatGPT API (OpenAI)
1. Get API key from [OpenAI Platform](https://platform.openai.com)
2. Add to `.env` as `OPENAI_API_KEY`
3. The app will use demo lyrics if no key is provided

### ElevenLabs Text-to-Speech
1. Get API key from [ElevenLabs](https://elevenlabs.io)
2. Add to `.env` as `ELEVENLABS_API_KEY`
3. The app will use demo audio URL if no key is provided

### MongoDB Database
1. Install MongoDB locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Update `MONGODB_URI` in `.env`
3. The app will use in-memory storage if MongoDB is not available

## 📊 Database Schema

### Users Collection
```javascript
{
  phone: String (unique),
  name: String,
  email: String (unique),
  termsAccepted: Boolean,
  promoAccepted: Boolean,
  createdAt: Date
}
```

### Songs Collection
```javascript
{
  userId: ObjectId (ref: User),
  receiverName: String,
  age: String,
  gender: String (Male/Female),
  mood: String,
  genre: String,
  voice: String,
  lyrics: String,
  audioUrl: String,
  createdAt: Date,
  audioGeneratedAt: Date
}
```

## 🎯 ChatGPT Prompt Structure

The application uses the exact prompt structure as specified:

```
Wish a happy birthday to <receiverName>.

Ensure that "Happy birthday" is mentioned at least twice in the lyrics, and it should rhyme. The lyrics should use simple, short, and easy to pronounce words as much as possible.

Using the above information, please write 16 lines of <genre> lyrics that I can dedicate to <him/her> for <his/her> birthday. Each line can have maximum of 8 words or 40 characters.

[Additional safety guidelines included...]
```

## 🔊 Audio Features

- **Real-time audio generation** using ElevenLabs API
- **Play/Pause functionality** with visual feedback
- **Voice selection** (Male/Female)
- **Error handling** for audio loading issues

## 📱 Mobile Responsiveness

- **Mobile-first design** approach
- **Responsive layouts** for all screen sizes
- **Touch-friendly** UI elements
- **Optimized performance** for mobile devices

## 🛡️ Validation & Security

- **Input validation** for all form fields
- **Email format validation**
- **Phone number validation** (10-digit)
- **Terms & Conditions** requirement
- **Error handling** throughout the application

## 🎨 Assets & Images

All required images are included in `/frontend/public/images/`:
- Brand logos and icons
- Decorative elements (balloons, music notes, etc.)
- UI components (buttons, progress indicators)
- Mood and genre selection icons

## 🚀 Deployment Ready

### Build for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm run build
npm start
```

### Hosting Options

- **Frontend**: Netlify, Vercel, GitHub Pages
- **Backend**: Heroku, Railway, DigitalOcean
- **Database**: MongoDB Atlas, AWS DocumentDB

## 🔧 Development Notes

- **Demo Mode**: Works without API keys using mock data
- **Progressive Enhancement**: Core functionality works offline
- **Error Recovery**: Graceful fallbacks for API failures
- **Performance**: Optimized for fast loading
- **Accessibility**: ARIA labels and keyboard navigation

## 📈 Performance Optimizations

- **Lazy loading** for images
- **Code splitting** in React components
- **Minimal dependencies** for faster builds
- **Caching strategies** for API responses

## 🐛 Known Issues & Solutions

1. **Audio playback on mobile**: Some browsers require user interaction
2. **API rate limits**: Implement proper retry logic
3. **Large audio files**: Consider compression/streaming

## 📞 Support & Troubleshooting

- Check console logs for detailed error messages
- Verify API keys are correctly set
- Ensure MongoDB connection (if using)
- Test with demo data first

## 🎉 Success Metrics

- ✅ **Full flow implementation** (6 pages)
- ✅ **AI integration** (ChatGPT + ElevenLabs)
- ✅ **Database integration** (MongoDB)
- ✅ **Mobile responsiveness**
- ✅ **Error handling**
- ✅ **Production ready**

---

**Built with ❤️ for creating personalized birthday memories!** 🎂🎵
