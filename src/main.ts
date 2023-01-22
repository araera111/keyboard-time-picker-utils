import cors from 'cors';
import express from 'express';
const app = express();
const port = 21001
app.use(cors())

app.get('/', (req, res) => {
  res.send('HELLO WORLD NODE SERVER...')
})

app.listen(port, () => {
  console.log(`start server 21001`);
})

