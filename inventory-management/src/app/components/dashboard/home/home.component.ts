import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  dashboard:any

  constructor(private user:AuthService){}

  ngOnInit(){
    this.user.reloadLogin();

    this.user.Dashboard(localStorage.getItem('UserToken')).subscribe((response)=>{
      this.dashboard= response[0]
      console.log(this.dashboard)
    },error=>{
      console.log(error);
    })
  }

  // openPDF(){
  //   let DATA: any = document.getElementById('htmlData');
  //   this.user.downloadPDF(DATA)
  // }

}
