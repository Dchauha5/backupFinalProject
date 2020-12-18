import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginEmail :any;
  loginPassword : any;
  signUpEmail :any;
  signUpPassword : any;
  signUpPasswordRepeat : any;

  constructor(private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  onLogin(){
    ///user/valid
    let user = {
      "email": this.loginEmail,
      "password": this.loginPassword
    }
    this.http.post("http://localhost:3000/user/valid",user)
      .subscribe((res: any) => {
        if(res == "true"){
          this.route.navigate(['/budget']);
        }
        else{
          window.alert("Invalid UserId or Password")
        }
      })
  }

  onSignUp(){
    if(this.signUpPassword == this.signUpPasswordRepeat){
      let user = {
        "email" : this.signUpEmail,
        "password" : this.signUpPassword
      }
      this.http.post("http://localhost:3000/new/user", user)
        .subscribe((res: any) => {
          window.alert("Registered Successfully")
          this.route.navigate(['/budget']);
        })
    }
    else{
      window.alert("Both Passwords doesn't match")
    }
  }


}
