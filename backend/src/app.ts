import express from 'express';
import cors from 'cors';
import testStripsRoutes from './routes/testStrips.routes';
import welcomeRoutes from './routes/welcome.routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
//@note Improvement Use Payload compression / zlib  // app.use(compression())  // require('compression');

app.use('/', welcomeRoutes);
//@note Improvement - versioning for backward compatability.  /api/v1/test-strips
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

//

//Improvements -
//Use testStripsRoutes GraphQL endpoint  - '@apollo/server typeDef resolver Mutation/Query' for many small queries,  api is complex and expanding
// Use Rate limiting with testStripsRoutes express-rate-limit , fastify-rate-limit , Nginx rate-limiting
//Async Logging
//Redis cache  - caching
//Payload compression
//Connection pool

//TOON over JSON

/*
File upload to CDN GCS/ Akamai
GCS Bucket - @google-cloud/storage  'elihealth-test-strips-uploads'
bucket.upload
await bucket.file(destination).makePublic();
*/

/* Monolith Architecture 
 Horizontal scaling - add more server --- one module downs , downs other module
*/

/*
Microservice architecture - folder structure 
 /microservices
    /api-gateway   --->  axios.post("http://qr-service:4001/scan",{ filePath });
    /qr-service  --> endpoint '/scan' --> QRService.extractQR(filePath);
    /db-service
    /image-service

    Each microservice will have:
    Dockerfile
    src/
    package.json
*/
