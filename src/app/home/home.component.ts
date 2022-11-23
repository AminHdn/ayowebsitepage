import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animation';
import { MOVIES, SERIES } from '../shared/movieinteface';

import { ActivatedRoute } from '@angular/router';


import { MovieService } from '../services/movie.service';
import { SeriesService } from '../services/series.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    expand(),
    flyInOut()
  ]
})
export class HomeComponent implements OnInit {
  movies!:MOVIES[];
  series!:SERIES[];
  searchTerm:string='';
  

  constructor(private movieService:MovieService,
    private serieService:SeriesService,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params['searchTerm']){
      this.movies=this.movieService.getmovies().filter(movie=>movie.name.toLowerCase().includes(params['searchTerm'].toLowerCase()));
      this.series=this.serieService.getSeries().filter(series=>series.name.toLowerCase().includes(params['searchTerm'].toLowerCase()));
      }else{
      this.movies=this.movieService.getmovies();
      this.series=this.serieService.getSeries();
      }
    })
    // this.movies=this.movieService.getmovies();
    // this.series=this.serieService.getSeries();

  }
  
 





  images = [
    {
      imageSrc:
        'https://images.unsplash.com/photo-1460627390041-532a28402358?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'nature1',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'nature2',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1640844444545-66e19eb6f549?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
      imageAlt: 'person1',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'person2',
    },
  ]
}
