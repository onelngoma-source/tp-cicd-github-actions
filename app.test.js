const request = require('supertest');
const app = require('./app');

describe('Test de base', () => {
  it('Devrait retourner 200 OK et le message Hello World', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Hello World');
  });
});