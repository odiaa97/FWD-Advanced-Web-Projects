import app from '../index';
import supertest from 'supertest';
import doImgProcessing from '../routes/api/services/imageProcessingService';
const request = supertest(app);

describe('given a filename, width and height to doImgProcessing function', () => {
  it('Should return a promise with the filename-width-height', () => {
    return doImgProcessing('fjord', 300, 300)
      .then((result) => {
        expect(result).toEqual('fjord-300-300');
      })
      .catch((err) => {
        expect(err).toEqual(err);
      });
  });

  it('Should return a promise error no file found', () => {
    return doImgProcessing('ford', 300, 300)
      .then((result) => {
        expect(result).toEqual('ford-300-300');
      })
      .catch((err) => {
        expect(err).toEqual(
          'Error: Input file is missing: D:\\Learning\\Udacity FWD Advanced Web\\Projects\\Project1 - Image Processing API\\public\\images\\ford.png'
        );
      });
  });
});

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
