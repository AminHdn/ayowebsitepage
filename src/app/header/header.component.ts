import { Component, OnInit } from '@angular/core';
import{MatDialog,MatDialogRef}from '@angular/material/dialog';
import{faMagnifyingGlass}from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  famag =faMagnifyingGlass;
  collapsed=false;

  constructor(  public dialog:MatDialog    ) { }
  ngOnInit(): void {
  }
  openLoginForm(){
    this.dialog.open(LoginComponent,{width:'500px',height:'450px'})
  }
ontoggle(){
  this

}

}
