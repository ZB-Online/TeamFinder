const express = require('express');

// MOCK
const todos = [
  {id: 1, name: "kim", pw:123},
  {id: 2, name: "dim", pw:345},
  {id: 3, name: "mim", pw:456},
  {id: 4, name: "oim", pw:676},
]



const app = express();
const PORT = 5500;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

app.use(express.static('./public'));
app.get('/todos', (req, res) => {
  res.send(todos);
})
app.post('/todos', (req, res) => {
  // const user = req.body;
  console.log(req);
  res.send(todos);
});