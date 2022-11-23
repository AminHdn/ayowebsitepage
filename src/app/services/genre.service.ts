import { Injectable } from '@angular/core';
import { gen, GEN, GENRE, genres } from '../shared/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor() { }
  getGenres():GENRE{
    return genres;
  }
  getGen():GEN[]{
    return gen;
  }
 
}
