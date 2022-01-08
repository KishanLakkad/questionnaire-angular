import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionnaireModel } from '../questionnaire-model.model';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.css']
})
export class QuestionnaireListComponent implements OnInit {
  public QuestionnaireData!: QuestionnaireModel[];
  public QuestionnaireDataStr!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let getDataLocalstorage: any = localStorage.getItem('QuestionnaireData');
    let data: any = JSON.parse(getDataLocalstorage)
    this.QuestionnaireData = data.sort((a: any, b: any) => {
      return <any>new Date(b.createdDate) - <any>new Date(a.createdDate);
    });
    
  }

  public delete(id: any) {
    this.QuestionnaireData = this.QuestionnaireData.filter((data: any) => data.id !== id)
    this.QuestionnaireDataStr = JSON.stringify(this.QuestionnaireData)
      localStorage.setItem('QuestionnaireData', this.QuestionnaireDataStr)
  } 

  public createQuestion() {
    this.router.navigate(['/questionnaire/create']);
  }

  public edit(id: any) {
    this.router.navigate([`/questionnaire/edit/${id}`]);
  }

  public goToQuestionnaire() {
    this.router.navigate([`/questionnaire/questionnaire-page`]);
  }

}
