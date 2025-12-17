const request = require('supertest');
const app = require('./app');

describe('Test de base', () => {
  it('Devrait retourner 200 OK et le Dashboard', async () => {
    const res = await request(app).get('/');
    
    // Vérifie que le serveur répond bien (Code 200)
    expect(res.statusCode).toEqual(200);
    
    // Vérifie que le titre spécifique du nouveau Dashboard est présent
    expect(res.text).toContain('DevOps Dashboard - Live Monitor');
  });
});