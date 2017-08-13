import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnswerService } from '../answer.service';
import { UserService } from '../user.service';
import {QuestionService} from '../question.service';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-comment',
  templateUrl: './newanswer.component.html',
  styleUrls: ['./newanswer.component.css']
})
export class NewAnswerComponent implements OnInit {
  // @Input() question;
  // @Output() updateQuestionEvent = new EventEmitter;
  // currentUser = {_id: ''};
  newAnswer = {user:'',question:'' };
  param_id: string;
  question = {_id:''};
  errors=[];
  user={name:''};
  currentUser ={_id: '', name: ''};


  constructor(
    private _userService:UserService,
    private _questionService:QuestionService,
    private _answerService:AnswerService,
    private router: Router,
    private _router:ActivatedRoute
  ) {this._router.params.subscribe(param=>this.param_id=param.id)}

    
//create a new answer 
  createAnswer(newAnswer){
      this.newAnswer.user = this.currentUser._id;
      this.newAnswer.question= this.question._id;
      return this._answerService.create(this.newAnswer)
      .then(answer => {
        if(answer.errors){
          console.log('awwwwww sheeeeet!!!!!');
          for(let key in answer.errors){
            let error = answer.errors[key];
          this.errors.push(error.message)
          }
        }
        else{
          // this.getQuestion();
          this.router.navigateByUrl('dashboard');
        }
      })
      .catch(err => console.log(err));
    }
    
//funcitons run on initialization of webpage

  ngOnInit() {
    this.isLoggedIn();
    this.getCurrentUser();
    this.getQuestion();

  }
    
//getting the user id of the current user
  getCurrentUser(){
    this.currentUser = this._userService.getCurrentUser();
  }

//selecting a question and displaying its properties
  getQuestion(){
    return this._questionService.show(this.param_id)
    .then(question => this.question = question)
    .catch(err=> console.log(err));
  }

logout(){
  this._userService.logout();
  this.router.navigateByUrl('/');
}
    
//ensuring that a user cannot access this component without logging in
isLoggedIn(){
  if(this._userService.getCurrentUser()==null){
    this.router.navigateByUrl('/');
  }
}



}
