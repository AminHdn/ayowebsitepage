import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators }from '@angular/forms';
import { Login } from '../shared/login';
import{ faUser } from '@fortawesome/free-solid-svg-icons'
import { SingupService } from '../services/singup.service';
import { SIGNUP } from '../shared/feedback';
import { MatDialogClose, MatDialogRef, _closeDialogVia } from '@angular/material/dialog';
import { ShareAbleService } from '../services/share-able.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  fuser=faUser;
  User!:string;
  password!:string;
  userInformation:SIGNUP[]=[]  ;
  match?:SIGNUP;
 
  @Input() login?:boolean;
  


  formErrors:Login = {
    username:'',
    password:''
  };
  validationMessages = {
    'username': {
      'required':'User Name is required.',
      
    },
    'password': {
      'required':'Password is required.',
      
    },
  };

  constructor( private lo:FormBuilder,
    private signupService:SingupService,
    @Inject('baseURL')public BaseURL:any,
    public dialogref:MatDialogRef<LoginComponent>,
    private sahreableService:ShareAbleService,
    
    ) { 
    this.createForm();
  }

  ngOnInit(): void {
    
    this.signupService.getUsers()
    .subscribe((user)=>this.userInformation=user)
  }
  createForm(){
    this.loginForm=this.lo.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  this.loginForm.valueChanges
    .subscribe(data=>this.onValueChanged(data));
  this.onValueChanged();
  }
  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field as keyof Login] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field as keyof Login];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field as keyof Login] += messages[key as keyof typeof messages] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit(){
    this.User=this.loginForm.value.username;
    this.password=this.loginForm.value.password;
    console.log(this.userInformation)
    this.match=this.signupService.loginmatch(this.User);
    // this.match=this.userInformation.filter(option=>option.name.includes( this.User))[0];
    console.log(this.match)
    if(this.match?.password==this.password){
      this.login=true;
      this.sahreableService.sendData(this.login);
      this.sahreableService.sendData(this.match);
      localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
      this.User=='admin' ?localStorage.setItem('userType','admin'):localStorage.setItem('userType','user')
      localStorage.setItem('match',JSON.stringify(this.match));
      localStorage.setItem('in',this.login? 'true':'false')
      this.dialogref.close();
      console.log( 'Login',this.login)
    }
    else{
      this.login=false;
      this.sahreableService.sendData(this.login);
      console.log('password or username is incorrect',this.login)
        

    }
   

    }

  }

