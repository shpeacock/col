import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { QuestionService } from '../question.service';
import {AnswerService} from '../answer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  currentUser = { _id: '' , questions:[]};
  newQuestion = { user: '' };
  questions:any[] = [];
  @Input() Question;


  constructor(
    private _userService:UserService,
    private _questionService:QuestionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getQuestions();
    this.isLoggedIn();
  }

  getQuestions(){
    return this._questionService.getQuestions()
    .then(questions => this.questions = questions)
    .catch(err => console.log(err));
  }

  getCurrentUser(){
    this.currentUser = this._userService.getCurrentUser();
  }

logout(){
  this._userService.logout();
  this.router.navigateByUrl('/');
}

isLoggedIn(){
  if(this._userService.getCurrentUser()==null){
    this.router.navigateByUrl('/');
  }
}

deleteQuestion(id:string, idx:number){
    return this._questionService.deleteQuestion(id, idx)
    .then(question=>{
          this.currentUser.questions.splice(idx,1);
          this.getQuestions();
          })
    .catch(err=>{console.log(err)});
    
    
}

}
