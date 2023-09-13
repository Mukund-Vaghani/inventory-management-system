import { Component } from '@angular/core';
import { Color } from '@kurkle/color';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private modalService: NgbModal, private user : AuthService) {}

  openModal() {
    const modalRef = this.modalService.open(ModalComponent);
  }

  userData:any

  ngOnInit() {
    this.user.userDetail(localStorage.getItem('UserToken')).subscribe((response)=>{
      this.userData = response;
    },error=>{
      console.log(error);
    })
  }

}
