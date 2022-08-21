import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('given a request parameter', () => {
  it('Should response with 200 OK', async () => {
    const response = await request.get('/api/images?filename=katarina');
    expect(response.statusCode).toBe(200);
  });

  it('Should response with 200 OK if fielname parameter is not found', async () => {
    const response = await request.get('/api/images?filname=katarina');
    expect(response.statusCode).toBe(200);
  });

  it('Should response with 400 Bad Request if the width is not a number', async () => {
    const response = await request.get(
      '/api/images?filename=katarina&height=300&width=metain'
    );
    expect(response.statusCode).toBe(400);
  });

  it('Should response with 400 Bad Request if the height is not a number', async () => {
    const response = await request.get(
      '/api/images?filename=katarina&height=toltomeya&width=200'
    );
    expect(response.statusCode).toBe(400);
  });
});

describe('given a request without parameters', () => {
  it('Should return with 200 OK', async () => {
    const response = await request.get('/api/images');
    expect(response.statusCode).toBe(200);
  });
});
