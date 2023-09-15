import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-system-user',
  templateUrl: './system-user.component.html',
  styleUrls: ['./system-user.component.css']
})
export class SystemUserComponent {

  constructor( private user : AuthService, private router:Router) {}

  system_user:any

  ngOnInit(){
    this.user.systemUserList(localStorage.getItem('UserToken')).subscribe((response)=>{
      this.system_user= response
    },error=>{
      console.log(error);
    })
  }

}
