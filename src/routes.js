const express = require('express');
const router = express.Router();

router.get('/movies', async (req, res) => {
  const { title } = req.query;
  const apiKey = process.env.OMDB_API_KEY;

  try {
    const response = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=${apiKey}`);
    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;