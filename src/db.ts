import { Client } from "pg";
import dotenv from "dotenv";

let client: Client | null = null;
dotenv.config();
console.log("DB URL : ",process.env.DATABASE_URL);
const getClient = () => {
  if (!client) {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    client.connect();
  }
  return client;
};

export default getClient;