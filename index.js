require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt,
      n: 1,
      size: "512x512"
    })
  });

  const data = await response.json();
  res.json({ image_url: data.data[0].url });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
