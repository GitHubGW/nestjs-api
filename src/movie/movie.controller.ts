import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Movie } from './entity/movie.entity';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/')
  handleGetAllMovies(): Movie[] {
    return this.movieService.handleGetAllMovies();
    // return MovieService.prototype.handleGetAllMovies();
  }

  @Get('/search')
  handleSearchMovie(@Query('year') year: string) {
    return `handleSearchMovie: ${year}`;
  }

  @Get('/:id')
  handleGetMovie(@Param('id') id: string): Movie {
    return this.movieService.handleGetMovie(id);
  }

  @Post('/')
  handleCreateMovie(@Body() movieData) {
    return this.movieService.handleCreateMovie(movieData);
  }

  @Patch('/:id')
  handleUpdateMovie(@Param('id') id: string, @Body() updateData) {
    return { id, ...updateData };
  }

  @Delete('/:id')
  handleDeleteMovie(@Param('id') id: string): boolean {
    return this.movieService.handleDeleteMovie(id);
  }
}
