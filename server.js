import express from 'express';
import posting from './api/posting';
import signIn from './api/signin';
import signUp from './api/signup';

const app = express();
const PORT = 5500;

app.use(express.static('public'));
app.use(express.json());

app.use('/api', posting);
app.use('/signin', signIn);
app.use('/signup', signUp);

app.listen(PORT, () => {
  console.log(`✔ Listening on : http://localhost:${PORT}`);
});
