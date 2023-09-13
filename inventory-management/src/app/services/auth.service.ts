import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  // SIGNUP API
  userSignUp(data: any) {
    axios({method:'post',url:'http://localhost:8597/v1/auth/signup',headers:{'api-key':'20230420','Content-Type':'application/json'},data:data}).then((response)=>{
      if(response.data.code == 1){
        this.toastr.success(response.data.message, 'Success');
        this.router.navigate(["/login"])
      }else{
        this.toastr.error(response.data.message, 'Error');
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  //LOGIN API
  userLogin(data:any){
    axios({method:'post',url:'http://localhost:8597/v1/auth/login',headers:{'api-key':'20230420','Content-Type':'application/json'},data:data}).then((response)=>{
      if(response.data.code == 1){
        this.toastr.success(response.data.message,'Success!');
        localStorage.setItem('UserToken',response.data.data.tokens);
        this.isLoggedIn.next(true);
        this.router.navigate(['dashboard']);
      } else {
        this.toastr.error(response.data.message,'Error!');
      };
    }).catch((error:any)=>{
      this.toastr.error(error,'Error!');
    });
  };

  //LOG OUT API
  userLogOut(data:any){
    axios({method:'post',url:'http://localhost:8597/v1/auth/logout',headers:{'api-key':'20230420','token':data,'Content-Type':'application/json'}}).then((response)=>{
      if(response.data.code == 1){
        localStorage.clear();
        // this.toastr.success(response.data.message,'Success!');
        this.router.navigate(["/login"])
      } else {
        this.toastr.error(response.data.message,'Error!');
      };
    }).catch((error:any)=>{
      this.toastr.error(error,'Error!');
    });
  };

//USER DETAIL API
  userDetail(data:any):Observable<any>{
    return new Observable<any>((observer)=>{

      axios({method:'post',url:'http://localhost:8597/v1/auth/getprofile',headers:{'api-key':'20230420','token':data,'Content-Type':'application/json'}}).then((response)=>{
        if(response.data.code == 1){
          // this.toastr.success(response.data.message,'Success!');
          observer.next(response.data.data)
          observer.complete();
        } else {
          // this.toastr.error(response.data.message,'Error!');
          observer.error(response.data.message);
        };
      }).catch((error:any)=>{
        this.toastr.error(error,'Error!');
      });
    })
  }






  
  reloadLogin(){
    if(localStorage.getItem('UserToken')){
      this.isLoggedIn.next(true);
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['/']);
    };
  }
  
  reloadRegister(){
    if(localStorage.getItem('UserToken')){
      this.isLoggedIn.next(true);
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['/register']);
    };
  }

}
