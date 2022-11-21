import express from 'express';
import bodyParser from 'body-parser';
import rechner from './logic/hauptrechner.js';

const app = express();
const port = 8081;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/calculate', (req, res) => {
  const input = req.body;
  const result = rechner.calculateAllResults(input);
  res.json(result);
});

app.listen(port, () => console.log(`API listening on port ${port}!`));
