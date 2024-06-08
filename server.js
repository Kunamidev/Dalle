const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get token
app.get('/gettoken', async (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required!' });
  }

  try {
    const response = await axios.get(`https://allinoneapis-0isy.onrender.com/api/token?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
    const token = response.data.data.access_token_eaad6v7;
    const token2 = response.data.data.access_token;
    const cookie = response.data.data.cookies;

    res.json({ token, token2, cookie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting the token!' });
  }
});

// Serve the index.html file for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
