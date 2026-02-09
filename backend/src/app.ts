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

/* Improvements -
    1.File upload to CDN GCS/ Akamai
        GCS Bucket - @google-cloud/storage  'elihealth-test-strips-uploads'
        
        bucket.upload await bucket.file(destination).makePublic();
        
    2.Redis Caching at Service Layer -  testStrips.service

    3.Rate limiting -
        Use Rate limiting with testStripsRoutes express-rate-limit , fastify-rate-limit , Nginx rate-limiting

    4.Microservice over Monolith Architecture  
        Horizontal scaling may not be scalable 
    
    5.GraphQL endpoint for testStripsRoutes for customisable queries 
        Use testStripsRoutes GraphQL endpoint  - '@apollo/server typeDef resolver Mutation/Query' for many small queries,  api is complex and expanding

    6.Payload compression

    7.DB Connection Pooling & Prisma Integration

    8.


*/
