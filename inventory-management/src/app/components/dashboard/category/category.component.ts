import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import {CategoryModalComponent} from '../category/category-modal/category-modal.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  constructor(private modalService: NgbModal, private user : AuthService, private router:Router) {}
  openModal() {
    const modalRef = this.modalService.open(CategoryModalComponent);
  }

  category:any

  ngOnInit(){
    this.user.categoryList(localStorage.getItem('UserToken')).subscribe((response)=>{
      console.log(response);
      this.category= response
    },error=>{
      console.log(error);
    })
  }

  deleteCategory(category_id:any){
    category_id= {"category_id":category_id}
    this.user.categoryRemove(category_id,localStorage.getItem('UserToken'))
  }

  openPDF(){
    let DATA: any = document.getElementById('category');
    this.user.downloadPDF(DATA)
  }


}
