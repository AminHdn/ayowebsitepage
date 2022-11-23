import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { expand, flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';
import { ContactType, Feedback } from '../shared/feedback';



interface formerrors{
  firstname:string,
  lastname:string,
  telnum:string,
  email:string
}
  interface validationmessages  {
  firstname: {
    required:string
    minlength:string
    maxlength:string
  },
  lastname: {
    required:      string
    minlength:   string
    maxlength:     string
  },
  telnum: {
    required:     string
    pattern:    string}

  email: {
    required:    string
    email: string
  },
}



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})

export class ContactComponent implements OnInit {
  feedbackForm!:FormGroup;
  feedback!:Feedback;
  contactType=ContactType;
  @ViewChild('fform') feedbackFormDirective:any;
  newfeedback!:Feedback[];
  visibility='shown';
  spinnervis='hidden';
  feed!:Feedback;
  formErrors:formerrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };
  validationMessages:validationmessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };


  constructor(private fb:FormBuilder,private feedbackService:FeedbackService,
    @Inject('baseURL')public BaseURL:any
    ) {
    this.createForm();
   }

  ngOnInit(): void {
  }
  createForm() {
    this.feedbackForm = this.fb.group({
     firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
     lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
     telnum: ['', [Validators.required, Validators.pattern] ],
     email: ['', [Validators.required, Validators.email] ],
     agree: false,
     contacttype: 'None',
     message: ''
   });
   this.feedbackForm.valueChanges
   .subscribe(data => this.onValueChanged(data));

 this.onValueChanged(); // (re)set validation messages now

}
onValueChanged(data?: any) {
 if (!this.feedbackForm) { return; }
 const form = this.feedbackForm;
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




 onSubmit() {
   this.feedback = this.feedbackForm.value;
   this.feedbackService.submitFeedback(this.feedback)
     .subscribe(feedback=>this.feed=feedback)
    //  this.visibility='hidden';
    //  this.spinnervis='shown';
    //  setTimeout(() => {this.visibility='shown';this.spinnervis='hidden'
       
    //  }, 5000);
   console.log(this.feedback);
   this.feedbackForm.reset({
     firstname: '',
     lastname: '',
     telnum: '',
     email: '',
     agree: false,
     contacttype: 'None',
     message: ''
   });
   this.feedbackFormDirective.resetForm();
 }

}
