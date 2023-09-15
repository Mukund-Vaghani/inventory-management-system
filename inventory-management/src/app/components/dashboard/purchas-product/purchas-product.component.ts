import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-purchas-product',
  templateUrl: './purchas-product.component.html',
  styleUrls: ['./purchas-product.component.css']
})
export class PurchasProductComponent {

  constructor(private user:AuthService){}

  openPDF(){
    let DATA: any = document.getElementById('purchase-product');
    this.user.downloadPDF(DATA)
  }


}
