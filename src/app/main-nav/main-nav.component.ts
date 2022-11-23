import { Component, EventEmitter, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { faMagnifyingGlass, faMoon } from '@fortawesome/free-solid-svg-icons';
import { GEN, GENRE,genres } from '../shared/genre';
import { GenreService } from '../services/genre.service';
import { ShareAbleService } from '../services/share-able.service';
import { SIGNUP } from '../shared/feedback';
import { SingupService } from '../services/singup.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

export class MainNavComponent {
  famag =faMagnifyingGlass;
  famoon=faMoon
  isDarkTheme :boolean=false;
  searchopen:boolean=false;
  geners!:GENRE;
  gen!:GEN[];
  isDropdownOpen=false;
  User!:string;
@Input() login:boolean=false;
@Input() match!:SIGNUP;
@Input() open?:any;


  ngOnInit(){
    this.login=localStorage.getItem('in')=== 'true'?true:false;
    
   this.getUser();
    


    this.isDarkTheme=localStorage.getItem('theme')=== "Dark" ?true :false;
    this.shareableService.change.subscribe(emitedValue=>this.login=emitedValue);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    getUser():SIGNUP|null{
      const userJson=localStorage.getItem('match');
      if(userJson)
     return this.match=JSON.parse(userJson)as SIGNUP;

      return null;
    }

  constructor(private breakpointObserver: BreakpointObserver,
    public dialog:MatDialog,
    private genreService:GenreService,
    private shareableService:ShareAbleService ,
    private signupService:SingupService) {
      // console.log(this.match)
      this.geners=genreService.getGenres();
      this.gen=genreService.getGen();
      
    }



    
  openLoginForm(){
    this.dialog.open(LoginComponent,{width:'500px',height:'450px'})

  }
 
  storeThemeSelection(){
    localStorage.setItem('theme',this.isDarkTheme? 'Dark':'Light')
    
  }
  searchVisible(){
    if (this.searchopen)
    this.searchopen=false;
    else
    this.searchopen=true;
   
  }
  openDropDown(event:Event){
    this.isDropdownOpen=true;
  }

  closeDropDown(event:Event){
    this.isDropdownOpen=false;
  }
  Out(){
    this.login=false;
    this.shareableService.sendData(this.login);
    localStorage.removeItem('token')
    localStorage.setItem('in',this.login? 'true':'false');
    
  }

}

