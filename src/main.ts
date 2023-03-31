import cors from 'cors';
import express, { json } from 'express';
import pino from 'pino-http';

const logger = pino();

const app = express();
const port = 22004;
app.use(cors());
app.use(json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('HELLO WORLD NODE SERVER...2');
});

app.listen(port, () => {
  console.log(`start server http://127.0.0.1:22001`);
});
