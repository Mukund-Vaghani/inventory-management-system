import { Component } from '@angular/core';
import { generateReport } from 'src/app/common/generate-report';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-purchas-product',
  templateUrl: './purchas-product.component.html',
  styleUrls: ['./purchas-product.component.css']
})
export class PurchasProductComponent {

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
