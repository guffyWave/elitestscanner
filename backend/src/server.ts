import app from './app';

const PORT = process.env.PORT || 3000;

// Start server only when not running tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log('Backend running on port', PORT);
  });
}
