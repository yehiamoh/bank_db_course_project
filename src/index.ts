import express, { Request, RequestHandler, Response } from 'express';
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/account', async (req, res) => {
  try {
    const client = getClient();
    const result = await client.query(
      'SELECT * FROM account a INNER JOIN customer c ON a.customer_id = c.customer_id WHERE c.customer_id = 1'
    );
    res.json(result.rows);
    await client.end();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/loans', async (req, res) => {
  try {
    const client = getClient();
    const result = await client.query('SELECT * FROM loan');
    res.json(result.rows);
    await client.end();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const getCustomerById:RequestHandler = async (req:Request, res:Response) => {
  const id= req.params.id;
  try {
    const client = getClient();
    const result = await client.query('SELECT * FROM customer WHERE customer_id = $1', [id]);
    if (result.rows.length === 0) {
       res.status(404).json({ error: 'Customer not found' });
       return;
    }
    res.json(result.rows[0]);
    await client.end();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
app.get('/customer/:id',getCustomerById);




app.get('/transactions', async (req, res) => {
  try {
    const client = getClient();
    const result = await client.query('SELECT * FROM transaction');
    res.json(result.rows);
    await client.end();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});




const getTransactionByAccountId:RequestHandler =async (req:Request, res:Response) => {
  const account_id = req.params.id;
  try {
    const client = getClient();
    const result = await client.query('SELECT * FROM transaction WHERE account_id = $1', [account_id]);
    if (result.rows.length === 0) {
       res.status(404).json({ error: 'No transactions found for this account' });
       return;
    }
    res.json(result.rows);
    await client.end();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
app.get('/transactions/:account_id',getTransactionByAccountId);

export default app;
