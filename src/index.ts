const express = require('express');
const nodeFetch  = require('node-fetch');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/github', async (_req, res) => {
  try {
    const response = await nodeFetch('https://api.github.com/users/John-o-dev', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      console.log('RESPOSTA: ', response)
      return res.status(response.status).json({ error: 'Erro ao buscar repositórios' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
