import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { AppDataSource } from './database/data-source';

config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (_req: Request, res: Response): void => {
  res.json({ status: 'ok' });
});

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established');
    
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }); 