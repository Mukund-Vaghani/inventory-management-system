import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  constructor(private user:AuthService){}


  customer:any

  ngOnInit(){
    this.user.customerList(localStorage.getItem('UserToken')).subscribe((response)=>{
      console.log(response);
      this.customer= response
    },error=>{
      console.log(error);
    })
  }

  deleteCustomer(id:any){
    
  }

  openPDF(){
    let DATA: any = document.getElementById('customer');
    this.user.downloadPDF(DATA)
  }


}
