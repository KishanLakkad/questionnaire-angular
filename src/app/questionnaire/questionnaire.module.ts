import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { QuestionnaireRegistrationComponent } from './questionnaire-registration/questionnaire-registration.component';
import { FormsModule } from '@angular/forms';
import { QuestionnairePageComponent } from './questionnaire-page/questionnaire-page.component';


@NgModule({
  declarations: [
    QuestionnaireListComponent,
    QuestionnaireRegistrationComponent,
    QuestionnairePageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    QuestionnaireRoutingModule
  ]
})
export class QuestionnaireModule { }
