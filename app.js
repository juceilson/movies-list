const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./src/routes'));

app.listen(PORT, () => {
  console.log(`Server iniciado na porta ${PORT}`);
});