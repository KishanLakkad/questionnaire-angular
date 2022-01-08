import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'questionnaire',
    loadChildren: () =>
    import('./questionnaire/questionnaire.module').then(m => m.QuestionnaireModule),
  },
  {
    path: '',
    redirectTo: 'questionnaire',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
