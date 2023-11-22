import express, { Request, Response, Application } from 'express';
import cors from 'cors';

// Local Imports

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application Routes

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to mongoose assignment server');
});

export default app;
