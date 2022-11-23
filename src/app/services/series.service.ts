import { Injectable } from '@angular/core';
import { SERIES } from '../shared/movieinteface';
import { series } from '../shared/Movies';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  seriesname:string[]=[];

  constructor() { }
  getseri(id:string):SERIES{
    return series.filter((seri)=>(seri.id===id))[0];

  }
  getSeries():SERIES[]{
    return series;

  }
  getSeriesSide(){
    return series.filter((movie=>(movie.side===true)));
    
  }
  getseriesname(){
    
    for(let movie of series){
       this.seriesname.push(movie.name);
    }
    return this.seriesname;

  }
}
