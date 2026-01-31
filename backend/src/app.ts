import express from 'express';
import cors from 'cors';
import testStripsRoutes from './routes/testStrips.routes';
import healthRoutes from './routes/health.routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', healthRoutes);
app.use('/api/test-strips', testStripsRoutes);

// Serve uploads folder publicly
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
//http://localhost:3000/uploads/1769832544060-191518940.png

//@note : todo deploy of GCP

//@note : put meaningful variable Names


/// note - See the app is flowing ,  make diagram of the flow

export default app;
