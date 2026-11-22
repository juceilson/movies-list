const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, World!');
}); 

router.get('/movies', async (req, res) => {
  const { title } = req.query;
  const apiKey = process.env.OMDB_API_KEY;

  try {
    const response = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=${apiKey}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar os filmes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;