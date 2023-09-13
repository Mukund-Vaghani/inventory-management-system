import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;
  submitted = false;
  // registerControls: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private user:AuthService){
    this.registrationForm = this.formBuilder.group({
      name:['',Validators.required],
      role:['',Validators.required],
      email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password:['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]]
    })
  }

  get registerControls(){
    return this.registrationForm.controls;
  }

  signUp(data:any):void{
    console.log(data);
  }
  
  
  submitForm(){
    this.submitted = true;
    if(this.registrationForm.valid){
      this.user.userSignUp(this.registrationForm.value)
    }else{
      console.log('invalid')
    }
  }

  ngOnInit(): void {
    this.user.reloadRegister();
  }
}
