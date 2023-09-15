import { Component } from '@angular/core';
import * as authService from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModalComponent } from '../product/product-modal/product-modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  constructor(private modalService: NgbModal, private user : authService.AuthService, private router:Router) {}
  
  openModal(): void {
    const modalRef = this.modalService.open(ProductModalComponent);
  }

  product:any

  ngOnInit(){
    this.user.productList(localStorage.getItem('UserToken')).subscribe((response)=>{
      this.product= response
    },error=>{
      console.log(error);
    })
  }

  deleteProduct(product_id:any){
    product_id= {"product_id":product_id}
    this.user.productRemove(product_id,localStorage.getItem('UserToken'))
  }

  openPDF(){
    let DATA: any = document.getElementById('product');
    this.user.downloadPDF(DATA)
  }

}
