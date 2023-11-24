import express, { Request, Response, Application } from 'express';
import cors from 'cors';

// Local Imports
import userRouter from './app/modules/user/user.route';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application Routes
app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to mongoose assignment server !');
});

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route Not Found!',
    error: {
      code: 404,
      description: `The route ${req.originalUrl} does not exist`,
    },
  });
});
export default app;
