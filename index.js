const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('IntelliPlan AI Backend is running');
});

// Routes
app.post('/api/generate-layout', async (req, res) => {
  try {
    const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
    // Use dynamic import for node-fetch or use axios if installed. 
    // I didn't install axios in server, but I did install it in client. 
    // I can use built-in fetch in Node 18+.
    const response = await fetch(`${aiServiceUrl}/generate-layout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error(`AI Service Error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error generating layout:', error);
    res.status(500).json({ status: 'error', message: 'Failed to generate layout' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
