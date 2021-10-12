import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';

@Injectable()
export class MovieService {
  private movies: Movie[] = [];

  handleGetAllMovies(): Movie[] {
    return this.movies;
  }

  handleGetMovie(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException(`Not Found Movie ID: ${id}`);
    }
    return movie;
  }

  handleCreateMovie(movieData: CreateMovieDto): Movie {
    const newMovie = { id: this.movies.length + 1, ...movieData };
    this.movies.push(newMovie);
    return newMovie;
  }

  handleUpdateMovie(id: number, updateData: UpdateMovieDto): boolean {
    const movie = this.handleGetMovie(id);

    if (!movie) {
      return false;
    } else {
      this.handleDeleteMovie(id);
      this.movies.push({ ...movie, ...updateData });
      return true;
    }
  }

  handleDeleteMovie(id: number): boolean {
    this.handleGetMovie(id);
    const notDeletedMovies = this.movies.filter((movie) => movie.id !== id);

    if (this.movies.length > notDeletedMovies.length) {
      this.movies = notDeletedMovies;
      return true;
    } else {
      return false;
    }
  }
}
