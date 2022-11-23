import { Component, Directive, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SingupService } from '../services/singup.service';
import { SIGNUP } from '../shared/feedback';
import { formerrors, validationmessages } from '../signup/signup.component';



@Component({
  selector: 'app-userdashbord',
  templateUrl: './userdashbord.component.html',
  styleUrls: ['./userdashbord.component.scss']
})
export class UserdashbordComponent implements OnInit {
  editsignupForm!:FormGroup;
  signup!:SIGNUP;
  editUser!:SIGNUP;
  user!:SIGNUP;
  @ViewChild('fform') editsignupFormDirective:any;
  match!:SIGNUP;
  formErrors:formerrors = {
    'name': '',
    'password': '',
    'passwordconfirm': '',
    'email': '',
    'phonenumber':''
  };
   validationMessages:validationmessages = {
    'name': {
      'required':      'Name is required.',
      'minlength':     ' Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 20 characters long.',
      'confirmedUser':  'User was Taken'
    },
    'password': {
      'required':      'password is required.',
      'maxlength':     'password cannot be more than 20 characters long.',
      'pattern':' حداقل باید 8 کارکترو شامل حروف بزرگ ،اعداد،@و...باشد '
    },
    'passwordconfirm':{
      'required':'password is required.',
      'confirmedValidator':'password not match!!!'
     
    },
    
    'email': {
      'email':         'Email not in valid format.'
    },
    'phonenumber':{
      'required':'Phonenumber is required.',
      'pattern':'phone number invalid format'
      
    }
  };
  constructor(private fb:FormBuilder,
    private signupService:SingupService,
    @Inject('baseURL')public BaseURL:any,
    private router:Router
    ) { 
    this.createForm();
    console.log(this.match,'con')
  }

  ngOnInit(): void {
  this.getUser();
  this.newvalue();
  console.log(this.match,'init')
  
  // this.editsignupForm.patchValue({name:this.match.name,
  // email:this.match.email,
  // password:this.match.password,
  // passwordconfirm:this.match.password,
  // phonenumber:this.match.phonenumber
  // });
  }

  createForm(){
    this.editsignupForm=this.fb.group({
      name:['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
      password:['',[Validators.required,Validators.maxLength(20),Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      )]],
      passwordconfirm:['',Validators.required],
      email:['',[Validators.email]],
      phonenumber:['',[Validators.pattern,Validators.required]]
    }, {validators:this.ConfirmedValidator('password', 'passwordconfirm')&&this.ConfirmedUser('name')}
    // &&this.ConfirmedUser('name')
    )
  
    // this.editsignupForm.patchValue({'name':this.match.name})
    

    this.editsignupForm.valueChanges
    .subscribe(data=>this.onValueChanged(data));

    

   this.onValueChanged();

  }
  get f(){
    return this.editsignupForm.controls;
  }


  onValueChanged(data?:any){
    if (!this.editsignupForm) { return; }
 const form = this.editsignupForm;
 for (const field in this.formErrors) {
   if (this.formErrors.hasOwnProperty(field)) {
     // clear previous error message (if any)
     this.formErrors[field as keyof formerrors] = '';
     const control = form.get(field);
     if (control && control.dirty && !control.valid) {
       const messages = this.validationMessages[field as keyof formerrors];
       for (const key in control.errors) {
         if (control.errors.hasOwnProperty(key)) {
           this.formErrors[field as keyof formerrors] += messages[key as keyof typeof messages] + ' ';
         }
       }
     }
   }
 }
    
  }
  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
ConfirmedUser(con:string){

  // const User=this.signupForm.value.name;
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[con];
     if(control.value==this.match?.name)
     return; 
    //  const neww=this.signupService.signupMatch(formGroup.controls['name'].value);
      
      if (control.errors && !control.errors['confirmedUser']) {
          return;
      }
      if (this.signupService.signupMatch(control.value) ) {
          control.setErrors({ confirmedUser: true });
      } else {
          control.setErrors(null);
      }
  }
}


onSubmit(){
  this.editUser=this.editsignupForm.value;

  this.signupService.editUser(this.match.id,this.editUser).subscribe(
    data=>{
      this.match=data;
      localStorage.setItem('match',JSON.stringify(this.match));
      console.log(this.match);
      this.match=this.getUser();
      location.reload();
      this.newvalue();
    }
    )
 
  //  this.signupService.grtUser(this.match.id).subscribe(item=>this.match=item);
  //  this.match=this.editUser;
  

  // this.editsignupForm.reset({
  //   name:'',
  //   password:'',
  //   passwordconfirm:'',
  //   email:'',
  //   phonenumber:''

  // });
  // this.editsignupFormDirective.resetForm();
  
  
}


newvalue(){
  this.editsignupForm.patchValue({
    name:this.match.name,
    email:this.match.email,
    password:this.match.password,
    passwordconfirm:this.match.password,
    phonenumber:this.match.phonenumber
    });

}







  
  getUser():SIGNUP{
    const userJson=localStorage.getItem('match');
    if(userJson)
   return this.match=JSON.parse(userJson)as SIGNUP;

   return this.match;

  }

}
