import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent {
  productForm: FormGroup;
  submitted = false;

  constructor(public activeModal: NgbActiveModal, private user: AuthService, private fb:FormBuilder ) {

    this.productForm = this.fb.group({
      product_name:['',Validators.required],
      product_category:['',Validators.required],
      product_price:['',Validators.required],
      product_qty:['',Validators.required],
    })
  }

  get productControl(){
    return this.productForm.controls;
  }

  product_data:any;
  submitForm(){
    this.submitted = true;
    if(this.productForm.valid){

      this.product_data = {
        "product_name":this.productForm.value.product_name,
        "price":this.productForm.value.product_price,
        "qty":this.productForm.value.product_qty,
        "category_id":this.productForm.value.product_category
      }

      this.user.addProduct(this.product_data,localStorage.getItem('UserToken'))
      this.activeModal.dismiss()
    }else{
      console.log('invalid')
    }
  }

  category:any

  ngOnInit(){
    this.user.categoryList(localStorage.getItem('UserToken')).subscribe((response)=>{
      // console.log(response);
      this.category= response
    },error=>{
      console.log(error);
    })
  }
}
