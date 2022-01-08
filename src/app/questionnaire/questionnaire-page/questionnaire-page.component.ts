import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionnaireModel } from '../questionnaire-model.model';

@Component({
  selector: 'app-questionnaire-page',
  templateUrl: './questionnaire-page.component.html',
  styleUrls: ['./questionnaire-page.component.css']
})
export class QuestionnairePageComponent implements OnInit {
  public QuestionnaireData!: QuestionnaireModel[];
  public QuestionnaireDataAnswered!: QuestionnaireModel[];
  public QuestionnaireDataStr!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let getDataLocalstorage: any = localStorage.getItem('QuestionnaireData');
    this.QuestionnaireData = JSON.parse(getDataLocalstorage)

    this.QuestionnaireData = this.QuestionnaireData.sort((a: any, b: any) => {
      return <any>new Date(b.createdDate) - <any>new Date(a.createdDate);
    });
    this.onChangesCall()

  }

  public onChangesCall() {
    let getDataLocalstorage: any = localStorage.getItem('QuestionnaireData');
    this.QuestionnaireDataAnswered = JSON.parse(getDataLocalstorage)
    this.QuestionnaireDataAnswered = this.QuestionnaireData.sort((a: any, b: any) => {
      return <any>new Date(b.updatedDate) - <any>new Date(a.updatedDate);
    });
  }

  public backToList() {
    this.router.navigate(['/questionnaire/list']);
  }

  public valueSelection(e: any, i: number, type: string) {
    if (type === "single") {
      this.QuestionnaireData[i].submittedAnswer = [e.target.value]
    }
    if (type === "multiple") {
      this.QuestionnaireData[i].submittedAnswer.push(e.target.value)
    }
    if (type === "free") {
      this.QuestionnaireData[i].submittedAnswer = [e.target.value]
    }
  }


  public submitAnswer(i: number) {
    if (this.QuestionnaireData[i].submittedAnswer.length <= 0) {
      alert("please write answer/select atleast one option")
      return
    }
    this.QuestionnaireData[i].isAnswered = true
    this.QuestionnaireData[i].updatedDate = new Date()
    this.QuestionnaireDataStr = JSON.stringify(this.QuestionnaireData)
    localStorage.setItem('QuestionnaireData', this.QuestionnaireDataStr)
    this.onChangesCall()

  }

  public revertAnswer(i: number) {
    this.QuestionnaireData[i].submittedAnswer = []
    this.QuestionnaireData[i].isAnswered = false
    this.QuestionnaireDataStr = JSON.stringify(this.QuestionnaireData)
    localStorage.setItem('QuestionnaireData', this.QuestionnaireDataStr)
    this.onChangesCall()
  }

  public chekedValue(option: string, i: number) {
    let val = this.QuestionnaireData[i].submittedAnswer.includes(option)
    return val
  }

  public isCorrectAns(i: number, questionType: string) {
    let flag: boolean = false
    if (questionType === "single") {
      if (this.QuestionnaireData[i].correctAnswer.includes(this.QuestionnaireData[i].submittedAnswer[0])) {
        flag = true
      }
    }
    if (questionType === "multiple") {
      this.QuestionnaireData[i].submittedAnswer.map((data: any) => {
        if (this.QuestionnaireData[i].correctAnswer.includes(data)) {
          flag = true
        }
      })
    }
    return flag
  }

  public correctAnswer(i: number) {
    return this.QuestionnaireData[i].correctAnswer.filter((data: any) => data !== null).join(',')
  }

}
