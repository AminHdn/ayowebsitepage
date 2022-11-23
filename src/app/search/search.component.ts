import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { map, Observable, skip, startWith } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { MOVIES } from '../shared/movieinteface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  myControl = new FormControl('');
  options:MOVIES[]=[];
  filteredOptions!: Observable<MOVIES[]>;

  

searchTerm:string='';
@Input() searchopen!:boolean;
  constructor(private route:ActivatedRoute,
     private router:Router,
     private movieService:MovieService) {
      
     }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params['searchTerm'])
      this.searchTerm=params['searchTerm'];
      this.options=this.movieService.getmovies();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    })
  }
  private _filter(value: string): MOVIES[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

search():void{
 
  if(this.searchTerm){
    this.router.navigateByUrl('/search/'+this.searchTerm);

  }

}
searchOne(option:string){

    this.router.navigateByUrl('/movie/'+option, { skipLocationChange: false });
 
 
 
 
 
  
}
}
