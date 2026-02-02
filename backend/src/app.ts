import express from 'express';
import cors from 'cors';
import testStripsRoutes from './routes/testStrips.routes';
import welcomeRoutes from './routes/welcome.routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', welcomeRoutes);
app.use('/api/test-strips', testStripsRoutes);

// Serving uploads folder publicly from the Node server for development purposes only.
// In production, ideally CDN - AWS S3 ,Cloudflare R2 , Google Cloud Storage
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
//http://localhost:3000/uploads/1769832544060-191518940.png

export default app;

//---- Backend Folder Responsibility --->>
// routes - express routing only
// controllers -	Input/output, Validate request and make response ,
// business - Image processing , QR Extraction
// services	 - Data manipulation (Databse quries)
// middleware	file upload
// utils	- constants, errors, loggers, utility functions
// config	- env variables, db
// common - types and models
// types	TS models & interfaces
