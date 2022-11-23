import { Component, OnInit ,Inject, ViewChild} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SingupService } from '../services/singup.service';
import { SIGNUP } from '../shared/feedback';


export interface formerrors{
  name:string,
  password:string,
  passwordconfirm:string,
  email:string,
  phonenumber:string

}

export interface validationmessages  {
  name: {
  required:string
  minlength:string
  maxlength:string
  confirmedUser:string
  },
  password: {
  required:string
 
  maxlength:string
  pattern:string
  },
  passwordconfirm:{
    required:string
    confirmedValidator:String
    
  }
  email: {
    email:string
  },
  phonenumber:{
    required:string
    pattern:string
  }
  
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
signupForm!:FormGroup;
signup!:SIGNUP;
newUser!:SIGNUP;
user!:SIGNUP;
@ViewChild('fform') signupFormDirective:any;
// passwordsMatching = false;


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
    'confirmedUser':'User was taken'
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
    @Inject('baseURL')public BaseURL:any) { 
      
      this.createForm();
      // this.signupForm.addValidators(this.createCompareValidator(
      //   this.signupForm.get('password')!,
      //   this.signupForm.get('passwordconfirm')!
      // )
      // );
    }


  ngOnInit(): void {
  }
  createForm(){
    this.signupForm=this.fb.group({
      name:['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
      password:['',[Validators.required,Validators.maxLength(20),Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      )]],
      passwordconfirm:['',[Validators.required]],
      email:['',[Validators.email]],
      phonenumber:['',[Validators.pattern,Validators.required]]
    }, {validators:this.ConfirmedValidator('password', 'passwordconfirm')&&this.ConfirmedUser('name')}
    

    )

    this.signupForm.valueChanges
    .subscribe(data=>this.onValueChanged(data));

   this.onValueChanged();

  }
  get f(){
    return this.signupForm.controls;
  }


  onValueChanged(data?:any){
    if (!this.signupForm) { return; }
 const form = this.signupForm;
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
  this.newUser=this.signupForm.value;

  this.signupService.submitSignup(this.newUser)
  .subscribe(newUser=>this.user=newUser);
  console.log(this.user)
  this.signupForm.reset({
    name:'',
    password:'',
    passwordconfirm:'',
    email:'',
    phonenumber:''

  });
  this.signupFormDirective.resetForm();

}



  // createCompareValidator(
  //  controlone:AbstractControl,
  //  controltwo:AbstractControl
  // ):ValidatorFn{
  //   return()=>{
  //     if(controlone.value!==controltwo.value){
  //       console.log('notmatch')
  //       return {match_error:'password dose not match!'};
  //     }
  //     console.log('null')
  //     return null;
      
  //   };
  // }



}
