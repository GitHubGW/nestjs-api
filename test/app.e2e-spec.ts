import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Home');
  });

  describe('/movie', () => {
    it('/movie (GET)', () => {
      return request(app.getHttpServer()).get('/movie').expect(200).expect([]);
    });

    it('/movie (POST)', () => {
      return request(app.getHttpServer())
        .post('/movie')
        .send({ title: 'Test Movie', year: 2021, rating: 10 })
        .expect(201);
    });

    it('/movie (POST)', () => {
      return request(app.getHttpServer())
        .post('/movie')
        .send({
          title: 'Test Movie',
          year: 2021,
          rating: 10,
          bug: 'This is bug',
        })
        .expect(400);
    });

    it('/movie (DELETE)', () => {
      return request(app.getHttpServer()).delete('/movie').expect(404);
    });
  });

  describe('/movie/:id', () => {
    it('/movie/:id (GET)', () => {
      return request(app.getHttpServer()).get('/movie/1').expect(200);
    });

    it('/movie/:id (GET)', () => {
      return request(app.getHttpServer()).get('/movie/999').expect(404);
    });

    it('/movie/:id (PATCH)', () => {
      return request(app.getHttpServer())
        .patch('/movie/1')
        .send({ title: 'Updated Test Movie', year: 2020, rating: 9 })
        .expect(200);
    });

    it('/movie/:id (PATCH)', () => {
      return request(app.getHttpServer())
        .patch('/movie/999')
        .send({ title: 'Updated Test Movie', year: 2020, rating: 9 })
        .expect(404);
    });

    it('/movie/delete/:id (DELETE)', () => {
      return request(app.getHttpServer()).delete('/movie/1').expect(200);
    });

    it('/movie/delete/:id (DELETE)', () => {
      return request(app.getHttpServer()).delete('/movie/999').expect(404);
    });
  });
});
