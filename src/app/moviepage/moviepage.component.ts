import { Component, OnInit } from '@angular/core';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { MOVIES, SERIES } from '../shared/movieinteface';
import { SeriesService } from '../services/series.service';


@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.scss']
})
export class MoviepageComponent implements OnInit {
movies!:MOVIES;
series!:SERIES;
  constructor(private movieService:MovieService ,
    private seriesService:SeriesService,
    //  private location:Location,
     private route:ActivatedRoute
     ) { }
  ngOnInit(): void {
    let id=this.route.snapshot.params['id']
    this.movies=this.movieService.getmovie(id);
    this.series=this.seriesService.getseri(id);
  }

 
}
