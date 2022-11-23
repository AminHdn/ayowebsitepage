import { Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { AuthService } from "../auth/auth.service";
import { SignloginGuard } from "../auth/signlogin.guard";
import { ContactComponent } from "../contact/contact.component";

import { HomeComponent } from "../home/home.component";
import { LoginComponent } from "../login/login.component";
import { MoviepageComponent } from "../moviepage/moviepage.component";
import { SignupComponent } from "../signup/signup.component";
import { UserdashbordComponent } from "../userdashbord/userdashbord.component";

export const routes:Routes=[
    {path:'home',component:HomeComponent},
    {path:'contact',component:ContactComponent},
    {path:'movie/:id',component:MoviepageComponent},
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'search/:searchTerm',component:HomeComponent},
    {path:'signup',component:SignupComponent,canActivate:[SignloginGuard]},
    {path:'dashbord',component:UserdashbordComponent,canActivate:[AuthGuard]},
    // {path:'login',component:LoginComponent}
]


