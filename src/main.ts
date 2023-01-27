import cors from 'cors';
import express, { json } from 'express';
const app = express();
const port = 22001;
app.use(cors());
app.use(json());

app.get('/', (req, res) => {
  res.send('HELLO WORLD NODE SERVER...');
});

app.listen(port, () => {
  console.log(`start server 22001`);
});
