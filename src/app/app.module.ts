import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgImageSliderModule } from 'ng-image-slider';

import { ProcessHttpMsgService } from './services/process-http-msg.service';
import { FeedbackService } from './services/feedback.service';
import { MovieService } from './services/movie.service';
import { SeriesService } from './services/series.service';
import { GenreService } from './services/genre.service';


import{ BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{ FlexLayoutModule,FlexModule }from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ObserversModule } from '@angular/cdk/observers';


import { baseURL } from './shared/baseurl';


import {MatToolbarModule}from '@angular/material/toolbar';
import{MatSlideToggleModule}from'@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import {MatListModule}from '@angular/material/list';
import{MatFormFieldModule}from'@angular/material/form-field';
import{MatInputModule}from '@angular/material/input';
import{MatSelectModule}from '@angular/material/select';
import{MatIconModule}from '@angular/material/icon';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';
import{MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import{MatMenuModule} from '@angular/material/menu';

import 'hammerjs';


import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from './carousel/carousel.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ContactComponent } from './contact/contact.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MoviepageComponent } from './moviepage/moviepage.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { SearchautocompleteComponent } from './searchautocomplete/searchautocomplete.component';
import { AutocompletematerialComponent } from './autocompletematerial/autocompletematerial.component';
import { SignupComponent } from './signup/signup.component';
import { ShareAbleService } from './services/share-able.service';

import { UserdashbordComponent } from './userdashbord/userdashbord.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    MainNavComponent,
    ContactComponent,
    SidebarComponent,
    MoviepageComponent,
    FooterComponent,
    SearchComponent,
    DropdownDirective,
    SearchautocompleteComponent,
    AutocompletematerialComponent,
    SignupComponent,

    UserdashbordComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FlexModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    NgImageSliderModule,
    CarouselModule,
    LayoutModule,
    HttpClientModule,
    ObserversModule
  ],
  entryComponents:[
    LoginComponent
  ],
  providers: [
    
    {
      provide:'baseURL',useValue:baseURL
    },
    ProcessHttpMsgService,
    SeriesService,
    MovieService,
    FeedbackService,
    GenreService,
    ShareAbleService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
