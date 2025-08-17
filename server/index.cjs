
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Testovací endpoint pro ověření spojení
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Načtení API klíče z proměnné prostředí
require('dotenv').config();
const BREVO_API_KEY = process.env.BREVO_API_KEY || '';

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { name: 'Marta Ilnytska', email: 'ima2203@seznam.cz' },
        to: [{ email: to }],
        subject,
        textContent: text,
      },
      {
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
