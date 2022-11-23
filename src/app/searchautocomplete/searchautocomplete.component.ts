import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable, of, switchMap, tap } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { SeriesService } from '../services/series.service';
import { MOVIES } from '../shared/movieinteface';
////search with rxjs
@Component({
  selector: 'app-searchautocomplete',
  templateUrl: './searchautocomplete.component.html',
  styleUrls: ['./searchautocomplete.component.scss']
})
export class SearchautocompleteComponent implements OnInit {
  @ViewChild('movieSearchInput',{static: true}) movieInput!:ElementRef;
  @Output()setmovieNameEvent = new EventEmitter<{name:string}>()

  movies:MOVIES[]=[];
  moviesname:string[]=[];
  isSearching:boolean=false;
  showSearches:boolean=false;
  searchedMovies:any=[];


  constructor(private movieService:MovieService,
    private seriesService:SeriesService) {
    //this.movies=['leon','the walking dead','breaking bad','SexEducation'];

    this.searchedMovies=this.moviesname;
   }

  ngOnInit(): void {
    this.movies=this.movieService.getmovies();
    this.moviesname=this.extractValue('name');
    // this.movies=this.movieService.getmoviesname();
    // this.movies=this.movies.push(this.seriesService.getseriesname());
    this.movieSearch();
  }
movieSearch(){
  const search= fromEvent(this.movieInput.nativeElement,'keyup').pipe(    //formevent=yek observable misaze ke roydad haye yek target ro moshakhas mikonad
    map((event:any)=>event.target.value),                                  //pipe=tabe daronesh gharar migire ke yek meghdarmigire va yek meghdar pas mide momkne chand tabe bashe 
                                                                            //map=har taghiri ro emal beshe barmigardone
    debounceTime(500),                                                      //debounceTime()=bad az zaman yek notifikation bar migardone
    distinctUntilChanged(),                                               //   distinctUntilChanged()=onayee ke yeksanan ro barmigardone
    tap( ()=>{                                                            //tap=baraye meghar dadan
      this.isSearching=true
    }),
    switchMap((term)=>term ? this.getMovies(term) : of<any>(this.moviesname)),      //switchmap()=baraye hame maghadir ejra mishe
    tap(()=>{
      this.isSearching=false;
      this.showSearches=true;
    }));
    search.subscribe(data=>{
      this.isSearching=false;
      this.searchedMovies=data;

    })

}
getMovies(name:any):Observable<any>{
  return of(this.filterMovies(name))

}
filterMovies(name:any){
  return this.moviesname.filter((val)=>val?.toLowerCase().includes(name.toLowerCase())==true)
}
setmovieName(name:any){
  this.searchedMovies=this.filterMovies(name);
  this.setmovieNameEvent.emit({name});
  this.movieInput.nativeElement.value=name;
  this.showSearches=false;

}
trackById(index:any,item:any):void{
  return item?._id;
}
extractValue(prop:any) {

  // extract value from property
  let extractedValue = this.movies.map(item => item[prop as keyof MOVIES]);

  return extractedValue;

}

}
