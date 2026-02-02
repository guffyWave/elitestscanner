import app from './app';

const PORT = Number(process.env.PORT) || 3000;

//@note Note -
// Run the docker first
// Execute docker-compose up --build

// Note - no need to start server only when running tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    // //0.0.0.0 listens to all incomming request from all IP , required for mobile app.
    console.log('Backend running on port', PORT);
  });
}
