import request from 'supertest';
import app from '../src/app';

describe('Root Endpoint /', () => {
  it('should return backend metadata info', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('version');
    expect(res.body).toHaveProperty('developer');
    expect(res.body).toHaveProperty('phone');
    expect(res.body).toHaveProperty('emailId');

    expect(res.body.message).toBe('Hello from eli-test-scanner backend!');
    expect(res.body.developer).toBe('Gufran Khurshid');
  });
});
