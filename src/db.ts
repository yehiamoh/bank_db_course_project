import { Client } from "pg";
import dotenv from "dotenv";


dotenv.config();

const connectionString = process.env.DATABASE_URL;
console.log(connectionString);

const getClient = () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  client.connect();
  return client;
};

export default getClient;