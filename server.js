import express from 'express';
import posting from './api/posting';

const app = express();
const PORT = 5500;

app.use(express.static('public'));

app.use('/api', posting);

app.listen(PORT, () => {
  console.log(`✔ Listening on : http://localhost:${PORT}`);
});
