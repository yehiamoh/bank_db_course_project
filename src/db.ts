import { Client } from "pg";
import dotenv from "dotenv";


dotenv.config();

const connectionString = process.env.DATABASE_URL;
console.log(connectionString);

let client: Client | null = null;
const getClient = () => {
  if (!client) {
    client = new Client({
      connectionString: connectionString,
      
    });
    client.connect();
  }
  return client;
};

export default getClient;