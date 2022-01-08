import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { QuestionnairePageComponent } from './questionnaire-page/questionnaire-page.component';
import { QuestionnaireRegistrationComponent } from './questionnaire-registration/questionnaire-registration.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'list', pathMatch: 'full'
  },
  {
    path: 'list',
    component: QuestionnaireListComponent
  },
  {
    path: 'create',
    component: QuestionnaireRegistrationComponent
  },
  {
    path: 'edit/:id',
    component: QuestionnaireRegistrationComponent
  },
  {
    path: 'questionnaire-page',
    component: QuestionnairePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionnaireRoutingModule { }
