import cors from 'cors';
import express, { json } from 'express';
import pino from 'pino-http';

const logger = pino();

const app = express();
const port = 22001;
app.use(cors());
app.use(json());
app.use(logger);

app.get('/a', (req, res) => {
  res.send('HELLO WORLD NODE SERVER...');
});

app.listen(port, () => {
  console.log(`start server 22001`);
});
