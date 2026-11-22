const request = require('supertest');
const app = require('../src/app');

describe('GET /api/movies', () => {

  test('deve retornar lista de filmescom status 200', async () => {
    const mockData = {
      Search: [ { Title: 'Batman', Year: '2010' }],
      Response: 'True',
    };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });
    
    const res = await request(app)
      .get('/api/movies')
      .query({ title: 'Batman' });
    
    expect(res.status).toBe(200);
    expect(res.body.Response).toBe('True');
  });
    
  test('deve retornar status 500 se o fetch lançar erro de rede', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Erro de rede'));

    const res = await request(app)
      .get('/api/movies')
      .query({ title: 'Batman' });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Erro interno do servidor' });
  });

});