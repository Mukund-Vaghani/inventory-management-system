import { Component } from '@angular/core';
import { generateReport } from 'src/app/common/generate-report';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-outgoing-product',
  templateUrl: './outgoing-product.component.html',
  styleUrls: ['./outgoing-product.component.css']
})
export class OutgoingProductComponent {

  constructor(private user:AuthService){}

  openPDF(){
    let DATA: any = document.getElementById('category');
    generateReport.downloadPDF(DATA)
  }

  openEXL(){
    let DATA: any = document.getElementById('category');
    generateReport.downloadEXL(DATA)
  }

}
