const express = require('express');
const cors = require('cors');
const client = require('prom-client');

const app = express();
app.use(cors());

// Simple API
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend 🎉' });
});

// Prometheus metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err.message);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
