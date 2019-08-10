const express = require('express');
const ks = require('node-key-sender');
const spawn = require('child_process').spawn;

const app = express();
app.use(express.json())

app.post('/unlock', async (req, res) => {
  try {
    const { text } = req.body;
    await ks.sendCombination(['shift','home']);
    if (text) await ks.sendText(text);
    ks.sendKey('enter');
    res.json({ ok: true });
  } catch (err) {
    if (err) res.status(500).send({ error: err.message });
  }
});

app.get('/lock', async (req, res) => {
  try {
    spawn('dde-lock');
    res.json({ ok: true });
  } catch (err) {
    if (err) res.status(500).send({ error: err.message });
  }
});

const PORT = 9999;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
