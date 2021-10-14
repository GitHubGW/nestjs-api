import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('handleGetAllMovies', () => {
    it('should return an array', () => {
      const result = service.handleGetAllMovies();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('handleGetMovie', () => {
    it('should return a movie', () => {
      service.handleCreateMovie({
        title: 'Test Movie',
        year: 2021,
        rating: 8,
        genres: ['Action'],
      });

      const result = service.handleGetMovie(1);
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Object);
      expect(result.id).toEqual(1);
      expect(result.title).toEqual('Test Movie');
      expect(result.year).toEqual(2021);
      expect(result.rating).toEqual(8);
      expect(result.genres).toEqual(['Action']);
    });

    it('should throw 404 error', () => {
      try {
        service.handleGetMovie(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Not Found Movie ID: 999`);
      }
    });
  });
});
