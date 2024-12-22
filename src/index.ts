import express from 'express';
import cors from 'cors';
import getClient from './db';

const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.json('Hello World!');
});
app.get('/users', async (req, res) => {
  try {
   const client = getClient();
    const result = await client.query('SELECT * FROM customer');
    res.json(result.rows);
    await client.end();
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});
export default app;