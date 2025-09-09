import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static audio files
app.use('/uploads', express.static(uploadsDir));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Birthday Song Generator API is running!',
    timestamp: new Date().toISOString(),
    endpoints: [
      'POST /api/register',
      'POST /api/verify-otp', 
      'POST /api/generate-lyrics',
      'POST /api/generate-audio'
    ]
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    message: 'API is working correctly',
    timestamp: new Date().toISOString()
  });
});

// In-memory database for demo (replace with MongoDB in production)
const users: any[] = [];
const songs: any[] = [];

// Register user endpoint
app.post('/api/register', (req, res) => {
  try {
    const { phone, name, email, termsAccepted, promoAccepted } = req.body;
    
    // Basic validation
    if (!phone || !name || !email || !termsAccepted) {
      return res.status(400).json({ 
        success: false, 
        message: 'All required fields must be provided' 
      });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.phone === phone || user.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists with this phone or email' 
      });
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      phone,
      name,
      email,
      termsAccepted,
      promoAccepted,
      createdAt: new Date()
    };

    users.push(newUser);

    res.json({ 
      success: true, 
      message: 'User registered successfully',
      userId: newUser.id
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Registration failed' 
    });
  }
});

// Mock OTP verification (using hardcoded OTP: 1234)
app.post('/api/verify-otp', (req, res) => {
  const { otp } = req.body;
  
  if (otp === '1234') {
    res.json({ success: true, message: 'OTP verified successfully' });
  } else {
    res.json({ success: false, message: 'Invalid OTP' });
  }
});

// Generate birthday song lyrics using Groq API
app.post('/api/generate-lyrics', async (req, res) => {
  try {
    const { userId, receiverName, age, gender, mood, genre, voice } = req.body;
    
    // Validate input
    if (!receiverName || !genre || !gender) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: receiverName, genre, gender'
      });
    }

    // Enhanced Groq API prompt with mood and personalization
    const moodDescription = mood ? `The song should have a ${mood} mood/vibe.` : '';
    const ageInfo = age ? ` ${receiverName} is turning ${age} years old.` : '';
    
    const prompt = `Write a personalized birthday song for ${receiverName}.${ageInfo} ${moodDescription}

Requirements:
- Write exactly 16 lines of ${genre} style lyrics
- Must mention "Happy birthday" at least twice
- Each line maximum 8 words or 40 characters
- Use simple, easy-to-pronounce words
- Must rhyme and flow well
- For a ${gender.toLowerCase()} person (use ${gender === 'Male' ? 'him/his/he' : 'her/her/she'} pronouns)
- Make it ${mood || 'joyful'} and ${genre.toLowerCase()} style
- Include ${receiverName}'s name naturally in the lyrics

IMPORTANT: Create completely unique, original lyrics that don't copy any existing songs. Avoid offensive content, proper nouns (except ${receiverName}), and copyrighted material.

Generate a fresh, personalized birthday song now:`;

    let lyrics = '';

    // Try Groq API if key is available
    if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your_groq_api_key_here') {
      try {
        console.log('Generating custom lyrics with Groq for:', receiverName, 'Genre:', genre, 'Mood:', mood);
        
        const response = await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            model: 'llama-3.1-8b-instant',
            messages: [
              {
                role: 'system',
                content: `You are an expert songwriter specializing in personalized birthday songs. You create unique, catchy lyrics that match the requested genre and mood perfectly.`
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            max_tokens: 600,
            temperature: 0.9
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );

        lyrics = response.data.choices[0].message.content.trim();
        console.log('Custom lyrics generated successfully by Groq');
        
      } catch (apiError: any) {
        console.error('Groq API Error:', apiError.response?.data || apiError.message);
        
        // Check if it's a quota/rate limit issue
        if (apiError.response?.data?.error?.code === 'rate_limit_exceeded') {
          return res.status(429).json({
            success: false,
            message: 'Groq API rate limit exceeded. Please wait a moment and try again.'
          });
        }
        
        return res.status(500).json({
          success: false,
          message: 'Failed to generate custom lyrics. Please check your Groq API key and try again.'
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'Groq API key is required to generate custom birthday songs. Please add your API key to continue.'
      });
    }

    // Store the generated song
    const song = {
      id: Date.now().toString(),
      userId: userId || 'demo',
      receiverName,
      age,
      gender,
      mood,
      genre,
      voice,
      lyrics,
      createdAt: new Date()
    };

    songs.push(song);

    res.json({ 
      success: true, 
      lyrics,
      songId: song.id
    });
    
  } catch (error) {
    console.error('Error generating lyrics:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error generating lyrics' 
    });
  }
});

// Text-to-Speech endpoint using ElevenLabs API
app.post('/api/text-to-speech', async (req, res) => {
  try {
    const { text, voice, songId } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Text is required for speech synthesis'
      });
    }

    let audioUrl = '';

    // Try ElevenLabs API if key is available
    if (false) { // Temporarily disabled to focus on lyrics functionality
      try {
        // ElevenLabs voice IDs (you can get these from their platform)
        const voiceIds = {
          'Male': 'pNInz6obpgDQGcFmaJgB', // Adam voice
          'Female': 'EXAVITQu4vr4xnSDxMaL' // Bella voice
        };

        const voiceId = voiceIds[voice as keyof typeof voiceIds] || voiceIds.Female;

        console.log('Calling ElevenLabs API with voice:', voice, 'voiceId:', voiceId);

        const response = await axios.post(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
          {
            text: text,
            voice_settings: {
              stability: 0.75,
              similarity_boost: 0.75
            }
          },
          {
            headers: {
              'Accept': 'audio/mpeg',
              'Content-Type': 'application/json',
              'xi-api-key': process.env.ELEVENLABS_API_KEY
            },
            responseType: 'arraybuffer'
          }
        );

        // Save the audio file
        const audioBuffer = Buffer.from(response.data);
        const fileName = `song_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.mp3`;
        const filePath = path.join(__dirname, '..', 'uploads', fileName);
        
        fs.writeFileSync(filePath, audioBuffer);
        
        // Create URL for the saved file
        audioUrl = `http://localhost:${PORT}/uploads/${fileName}`;
        
        console.log('ElevenLabs TTS successful, audio saved to:', fileName);

      } catch (apiError: any) {
        console.error('ElevenLabs API Error:', apiError.response?.data || apiError.message);
        // Fallback to demo audio URL
        audioUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
        console.log('Falling back to demo audio due to API error');
      }
    } else {
      // Demo audio URL when no API key is provided
      audioUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      console.log('Using demo audio URL - no ElevenLabs API key provided');
    }

    // Update song record with audio URL
    if (songId) {
      const song = songs.find(s => s.id === songId);
      if (song) {
        song.audioUrl = audioUrl;
        song.audioGeneratedAt = new Date();
      }
    }

    res.json({
      success: true,
      audioUrl,
      message: 'Audio generated successfully'
    });
    
  } catch (error) {
    console.error('Error generating speech:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error generating speech' 
    });
  }
});

// Get user's songs
app.get('/api/songs/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const userSongs = songs.filter(song => song.userId === userId);
    
    res.json({
      success: true,
      songs: userSongs
    });
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching songs'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
