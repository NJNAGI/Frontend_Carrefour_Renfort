import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceloginService } from 'src/app/services/servicelogin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private route:Router, private apidata:ServiceloginService) { }

  ngOnInit(): void {


    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],


  });
  }

  onSubmit() {
    this.submitted = true;
console.log(this.loginForm.value)
    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //     return;

    // }

    // display form values on success

    this.apidata.login(this.loginForm.value).subscribe((res:any)=>{
      console.log('reponse',res)
      if(res==null){
        Swal.fire({
          icon:'error',
          title:'user not found ',
          text:'Login invalid',
          footer:'password invalid'
        })
      }
      else{

        // Swal.fire({
        //   icon:'success',
        //   title:'user found',
        //   text:'email valid ',
        //   footer:'password valid'
        // })
        localStorage.setItem('userconnect',JSON.stringify(res.user))
        localStorage.setItem('token',res.access_token)
        localStorage.setItem('refreshtoken',res.refreshToken)
        localStorage.setItem("state","0")
      //  this.route.navigateByUrl('/home')
        window.location.href="https://frontendcarrefourrenfort.herokuapp.com/home"

      }
     }, err=>{
      Swal.fire({
        icon:'error',
        title:'user not found ',
        text:'Login invalid',
        footer:'password invalid'
      })
      console.log(err)
     })
    }

}
