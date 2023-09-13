import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(public activeModal: NgbActiveModal, private user: AuthService) { }


  userData:any

  ngOnInit() {
    this.user.userDetail(localStorage.getItem('UserToken')).subscribe((response)=>{
      this.userData = response;
    },error=>{
      console.log(error);
    })
  }
}

