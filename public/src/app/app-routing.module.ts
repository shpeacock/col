import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {QuestionComponent} from './question/question.component';
import {NewquestionComponent} from './newquestion/newquestion.component';
import {AnswerComponent} from './answer/answer.component';
import {NewAnswerComponent} from './newanswer/newanswer.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: LoginComponent},
    { path: 'dashboard', component: QuestionComponent},
    { path: 'newquestion', component: NewquestionComponent},
    {path: 'question/:id', component: AnswerComponent},
    {path: 'answer/:id', component: NewAnswerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
