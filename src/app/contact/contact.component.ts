import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import {Feedback,ContactType} from '../shared/feedback';
import { flyInOut,expand } from '../animations/app.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),expand()
    ]
})
export class ContactComponent implements OnInit {

  feedbackForm:FormGroup;
  feedback:Feedback;
  contactType=ContactType;
  @ViewChild('fform') feedbackFormDirective;
formErrors={
  'firstname':'',
  'lastname':'',
  'telnum':'',
  'email':'',
};
validationMessages=
{
  'firstname':{
    'required':'first name required.',
    'minlength':'First name must be at least 2 characters',
    'maxlength':'First name must be at least 25 characters'
}, 
  'lastname':{
    'required':'first name required.',
    'minlength':'First name must be at least 2 characters',
    'maxlength':'First name must be at least 25 characters'
}, 
  'telnum':{
    'required':'tel num  required.',
    'pattern':'te.num contain only numbers'
  },
  'email':{
    'required':'email num  required.',
    'email':'email is not valid must contain @'
  },
}
  constructor(private fb:FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void {
  }
createForm(){
  this.feedbackForm = this.fb.group({
    firstname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
    lastname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
    telnum: ['',[Validators.required,Validators.pattern]],
    email:['',[Validators.required,Validators.email]],
    agree: false,
    contacttype: 'None',
    message: ''
  });
  this.feedbackForm.valueChanges
  .subscribe(data=>this.onValueChanged(data));
  this.onValueChanged(); //re(set)form validation message
}
onValueChanged(data?:any)
{
  if(!this.feedbackForm){return;}
  const form=this.feedbackForm;
  for (const field in this.formErrors){
    if(this.formErrors.hasOwnProperty(field))
    {
      //clear pervious error message (ifany)
      this.formErrors[field]='';
      const control=form.get(field);
      if(control && control.dirty && !control.valid)
      {
        const messages =this.validationMessages[field];
        for(const key in control.errors)
        {
          if(control.errors.hasOwnProperty(key)){
            this.formErrors[field]+=messages[key]+ ' ';
          }
        }
      }
    }
  }
}
onSubmit() {
  this.feedback = this.feedbackForm.value;
  console.log(this.feedback);
  this.feedbackForm.reset(
    {  firstname: '',
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
