import { Injectable } from '@nestjs/common';
import { Movie } from './entity/movie.entity';

@Injectable()
export class MovieService {
  private movies: Movie[] = [];

  handleGetAllMovies(): Movie[] {
    return this.movies;
  }

  handleGetMovie(id: string): Movie {
    return this.movies.find((movie) => movie.id === +id);
  }

  handleCreateMovie(movieData) {
    return this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  handleDeleteMovie(id: string): boolean {
    const notDeletedMovies = this.movies.filter((movie) => movie.id !== +id);

    if (this.movies.length > notDeletedMovies.length) {
      this.movies = notDeletedMovies;
      return true;
    } else {
      return false;
    }
  }
}
