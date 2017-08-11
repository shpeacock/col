import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser = {};
  loginErrors = [];

  constructor(private _userService:UserService, private router:Router) { }

  ngOnInit() {
    localStorage.removeItem('currentUser');
  }

  createUser(newUser){
    return this._userService.create(this.newUser)
    .then(user => {
      if(user.errors){
        //create front-end error messages
        console.log('ahhh fuck you fucked it up');
        for(let key in user.errors){
          let error = user.errors[key];
          this.loginErrors.push(error.message);
          console.log(this.loginErrors);
  }
      } else {
        console.log(user);
        this._userService.setCurrentUser(user);
        // console.log(user.name);
        //redirect to answer-board
        this.router.navigateByUrl('dashboard')
      }
    })
    .catch(err => console.log(err));
  }

}
