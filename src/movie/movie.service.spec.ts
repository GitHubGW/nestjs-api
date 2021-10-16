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
    service.handleCreateMovie({
      title: 'Test Movie',
      year: 2021,
      rating: 8,
      genres: ['Action'],
    });
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

    it('should throw a NotFoundException', () => {
      try {
        service.handleGetMovie(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Not Found Movie ID: 999`);
      }
    });
  });

  describe('handleCreateMovie', () => {
    it('should create a movie', () => {
      const beforeCreateAllMoviesLength = service.handleGetAllMovies().length;
      const newMovie = service.handleCreateMovie({
        title: 'Test Movie',
        year: 2021,
        rating: 8,
        genres: ['Action'],
      });
      const afterCreateAllMoviesLength = service.handleGetAllMovies().length;

      expect(beforeCreateAllMoviesLength).toBeLessThan(
        afterCreateAllMoviesLength,
      );
      expect(newMovie).toBeInstanceOf(Object);
      expect(newMovie.title).toEqual('Test Movie');
      expect(newMovie.year).toEqual(2021);
      expect(newMovie.rating).toEqual(8);
      expect(newMovie.genres).toEqual(['Action']);
    });
  });

  describe('handleUpdateMovie', () => {
    it('should update a movie', () => {
      service.handleCreateMovie({
        title: 'Test Movie',
        year: 2021,
        rating: 8,
        genres: ['Action'],
      });

      const isUpdated = service.handleUpdateMovie(1, {
        title: 'Updated Test Movie',
        year: 2020,
        rating: 10,
        genres: ['Comedy'],
      });

      const updatedMovie = service.handleGetMovie(1);
      expect(isUpdated).toEqual(true);
      expect(updatedMovie.title).toEqual('Updated Test Movie');
      expect(updatedMovie.year).toEqual(2020);
      expect(updatedMovie.rating).toEqual(10);
      expect(updatedMovie.genres).toEqual(['Comedy']);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.handleUpdateMovie(999, {
          title: 'Updated Test Movie',
          year: 2020,
          rating: 10,
          genres: ['Comedy'],
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Not Found Movie ID: 999`);
      }
    });
  });

  describe('handleDeleteMovie', () => {
    it('should delete a movie', () => {
      service.handleCreateMovie({
        title: 'Test Movie',
        year: 2021,
        rating: 8,
        genres: ['Action'],
      });

      const beforeDeleteAllMoviesLength = service.handleGetAllMovies().length;
      service.handleDeleteMovie(1);
      const afterDeleteAllMoviesLength = service.handleGetAllMovies().length;
      expect(afterDeleteAllMoviesLength).toBeLessThan(
        beforeDeleteAllMoviesLength,
      );
    });

    it('should throw a NotFoundException', () => {
      try {
        service.handleDeleteMovie(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Not Found Movie ID: 999`);
      }
    });
  });
});
