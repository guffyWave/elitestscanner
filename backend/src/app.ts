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

// Serving uploads folder publicly from the Node server for development purposes only.
// In production, ideally CDN - AWS S3 ,Cloudflare R2 , Google Cloud Storage
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
//http://localhost:3000/uploads/1769832544060-191518940.png

//@note : todo deploy of GCP

export default app;

// Folder	Responsibility
// controllers -	Input/output, validate request, call service
// services	Business logic (image processing)
// middleware	file upload, auth, validation
// utils	helper libs (logger, DB connectors)
// config	env variables
// routes	express routing only
// types	TS models & interfaces
