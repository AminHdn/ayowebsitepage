import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { MOVIES } from '../shared/movieinteface';

@Component({
  selector: 'app-autocompletematerial',
  templateUrl: './autocompletematerial.component.html',
  styleUrls: ['./autocompletematerial.component.scss']
})


export class AutocompletematerialComponent implements OnInit {
  myControl = new FormControl('');
  options:MOVIES[]=[];
  filteredOptions!: Observable<MOVIES[]>;

  constructor(private movieService:MovieService) { }

  ngOnInit(): void {
    this.options=this.movieService.getmovies();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): MOVIES[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }


}
