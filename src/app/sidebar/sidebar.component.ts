import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { SeriesService } from '../services/series.service';
import { MOVIES, SERIES } from '../shared/movieinteface';
// import{movies, series}from '../shared/Movies'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  movies!:MOVIES[];
  series!:SERIES[];
  sideseries!:SERIES[];
  constructor(private movieService :MovieService,
    private seriesService:SeriesService) { }

  ngOnInit(): void {
    this.movies=this.movieService.getmovies();
    this.series=this.seriesService.getSeries();
    this.sideseries=this.seriesService.getSeriesSide();
  }

}
