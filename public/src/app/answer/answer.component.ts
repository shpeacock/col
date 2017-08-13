//importing services and components
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { QuestionService } from '../question.service';
import {AnswerService} from '../answer.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-comment',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  // @Input() answer;

  param_id: string;
  question={answers:[]};
  currentUser ={_id: '', answers:[]};
  user={name:''};
  answer={answer: ''};
  @Input() Question;

  constructor(
    private _userService:UserService,
    private _questionService:QuestionService,
    private router: Router,
    private _route: ActivatedRoute,
    private _answerService:AnswerService
    ) {
    this._route.params.subscribe(param=>this.param_id=param.id)
}

//functions run on initiation of http request
  ngOnInit() {
    this.isLoggedIn;
    this.getQuestion();
    this.getCurrentUser();
  }

//get all questions in db
  getQuestion(){
    return this._questionService.show(this.param_id)
    .then(question => this.question = question)
    .catch(err=> console.log(err));
  }

//identify user._id of current user
  getCurrentUser(){
    this.currentUser = this._userService.getCurrentUser();
  }

    
  logout(){
  this._userService.logout();
  this.router.navigateByUrl('/');
  }

//increase the likes of an answer
  increaseLikes(id:string, idx:number){
    return this._answerService.increaseLikes(id, idx)
    .then(answer=>this.question.answers[idx].likes++)
    .catch(err=>console.log(err));
  }

  isLoggedIn(){
  if(this._userService.getCurrentUser()==null){
    this.router.navigateByUrl('/');
  }
  }
    
  deleteAnswer(id:string,idx: number){
      return this._answerService.deleteAnswer(id, idx)
      .then(answer=>{
      this.currentUser.answers.splice(idx,1);
      this.getQuestion();              
      })
      .catch(err=>{console.log(err)})
  }

}