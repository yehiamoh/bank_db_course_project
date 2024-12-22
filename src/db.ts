import { Client } from "pg";

let client: Client | null = null;

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