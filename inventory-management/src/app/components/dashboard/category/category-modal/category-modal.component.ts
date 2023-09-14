import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent {
  categoryForm: FormGroup;
  submitted = false;

  constructor(public activeModal: NgbActiveModal, private user: AuthService, private fb:FormBuilder ) {

    this.categoryForm = this.fb.group({
      category_name:['',Validators.required]
    })
  }

  get categoryControl(){
    return this.categoryForm.controls;
  }

  submitForm(){
    this.submitted = true;
    if(this.categoryForm.valid){
      this.user.addCategory(this.categoryForm.value,localStorage.getItem('UserToken'))
      this.activeModal.dismiss()
    }else{
      console.log('invalid')
    }
  }
}
