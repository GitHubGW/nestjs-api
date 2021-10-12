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
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/')
  handleGetAllMovies(): Movie[] {
    return this.movieService.handleGetAllMovies();
  }

  @Get('/search')
  handleSearchMovie(@Query('year') year: string) {
    return `handleSearchMovie: ${year}`;
  }

  @Get('/:id')
  handleGetMovie(@Param('id') id: number): Movie {
    return this.movieService.handleGetMovie(id);
  }

  @Post('/')
  handleCreateMovie(@Body() movieData: CreateMovieDto): Movie {
    return this.movieService.handleCreateMovie(movieData);
  }

  @Patch('/:id')
  handleUpdateMovie(
    @Param('id') id: number,
    @Body() updateData: UpdateMovieDto,
  ): boolean {
    return this.movieService.handleUpdateMovie(id, updateData);
  }

  @Delete('/:id')
  handleDeleteMovie(@Param('id') id: number): boolean {
    return this.movieService.handleDeleteMovie(id);
  }
}
