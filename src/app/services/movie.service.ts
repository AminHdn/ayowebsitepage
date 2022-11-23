import { Injectable } from '@angular/core';
import { MOVIES } from '../shared/movieinteface';
import { movies } from '../shared/Movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
   moviesname:string[]=[];

  constructor() { }
  getmovies():MOVIES[]{
    return movies;

  }
  getmoviesname(){
    
    for(let movie of movies){
       this.moviesname.push(movie.name);
    }
    return this.moviesname;
  }
  getmovie(id:string):MOVIES{
    return movies.filter((movie)=>(movie.id===id))[0];

  }
}
