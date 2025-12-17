const request = require('supertest');
const app = require('./app');

describe('Test de base', () => {
  it('Devrait retourner 200 OK et le Dashboard', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    // On cherche le nouveau titre du dashboard
    expect(res.text).toContain('CI/CD Pipeline');
  });
});