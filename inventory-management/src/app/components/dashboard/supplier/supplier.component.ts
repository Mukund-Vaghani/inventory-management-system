import { Component } from '@angular/core';
import { generateReport } from 'src/app/common/generate-report';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {

  constructor(private user : AuthService){}

  supplier:any

  ngOnInit(){
    this.user.supplierList(localStorage.getItem('UserToken')).subscribe((response)=>{
      this.supplier= response
    },error=>{
      console.log(error);
    })
  }

  openPDF(){
    let DATA: any = document.getElementById('category');
    generateReport.downloadPDF(DATA)
  }

  openEXL(){
    let DATA: any = document.getElementById('category');
    generateReport.downloadEXL(DATA)
  }

  deleteSupplier(id:any){
    
  }

}
