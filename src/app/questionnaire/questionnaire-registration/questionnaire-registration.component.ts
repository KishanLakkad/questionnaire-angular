import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireModel } from '../questionnaire-model.model';

@Component({
  selector: 'app-questionnaire-registration',
  templateUrl: './questionnaire-registration.component.html',
  styleUrls: ['./questionnaire-registration.component.css']
})
export class QuestionnaireRegistrationComponent implements OnInit {
  public QuestionnaireData!: QuestionnaireModel;
  public option1!: string;
  public option2!: string;
  public option3!: string;
  public option4!: string;
  public correctAnswer1!: string;
  public correctAnswer2!: string;
  public correctAnswer3!: string;
  public correctAnswer4!: string;
  public QuestionnaireDataStr!: string
  public getItemFromLocalStorage: any[] = []
  public QuestionID!: string
  public errMessage = {
    errQuestion: "",
    errOption: "",
    errAnswer: "",
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    this.QuestionnaireData = {
      id: "",
      questionType: "single",
      question: "",
      submittedAnswer: [],
      options: [],
      correctAnswer: [],
      isAnswered: false,
      createdDate: new Date(),
      updatedDate: undefined
    }
    this.option1 = "",
      this.option2 = "",
      this.option3 = "",
      this.option4 = "",
      this.correctAnswer1 = "",
      this.correctAnswer2 = "",
      this.correctAnswer3 = "",
      this.correctAnswer4 = ""
    this.route.params.subscribe(params => {
      this.QuestionID = params['id']
    });
  }

  ngOnInit(): void {
    let getDataLocalstorage: any = localStorage.getItem('QuestionnaireData');
    let data: any = JSON.parse(getDataLocalstorage)
    if (getDataLocalstorage) {
      this.getItemFromLocalStorage = data
    }
    if (this.QuestionID) {
      const data = this.getItemFromLocalStorage.find((data: any) => data.id === this.QuestionID)
      this.QuestionnaireData = {
        id: data.id,
        questionType: data.questionType,
        question: data.question,
        submittedAnswer: data.submittedAnswer,
        options: data.options,
        correctAnswer: data.correctAnswer,
        isAnswered: data.isAnswered,
        createdDate: data.createdDate,
        updatedDate: undefined
      }
      this.option1 = data.options[0]
      this.option2 = data.options[1]
      this.option3 = data.options[2]
      this.option4 = data.options[3]
      this.correctAnswer1 = data.correctAnswer[0]
      this.correctAnswer2 = data.correctAnswer[1]
      this.correctAnswer3 = data.correctAnswer[2]
      this.correctAnswer4 = data.correctAnswer[3]
    }
  }

  public save() {
    const id = this.S4()
    let op = [this.option1, this.option2, this.option3, this.option4]
    let ca = [this.correctAnswer1, this.correctAnswer2, this.correctAnswer3, this.correctAnswer4]
    this.QuestionnaireData = {
      ...this.QuestionnaireData,
      id: id,
      options: op.filter((data: any) => data !== ""),
      correctAnswer: ca.filter((data: any) => data !== "")
    }
    let flag = false
    if(this.QuestionnaireData.options.length < 2 && this.QuestionnaireData.questionType !== "free") {
      this.errMessage.errOption = "please enter atleast two option"
      flag = true
    }
    if(this.QuestionnaireData.question === "") {
      this.errMessage.errQuestion = "please enter question"
      flag = true
    }
    debugger
    if(this.QuestionnaireData.correctAnswer.length <= 0 && this.QuestionnaireData.questionType !== "free") {
      this.errMessage.errAnswer = "please enter atleast one submitted answer"
      flag = true
    }
    
    if(flag) {
      return
    }


    let getItemFromLocalStorage = localStorage.getItem('QuestionnaireData');

    if (getItemFromLocalStorage === null || getItemFromLocalStorage === "") {
      this.QuestionnaireDataStr = JSON.stringify([this.QuestionnaireData])
      localStorage.setItem('QuestionnaireData', this.QuestionnaireDataStr)
    } else {
      if (this.QuestionID) {
        this.getItemFromLocalStorage = this.getItemFromLocalStorage.map((data: any) => {
          if (data.id === this.QuestionID) {
            return this.QuestionnaireData
          } else {
            return data
          }
        })
        this.QuestionnaireDataStr = JSON.stringify(this.getItemFromLocalStorage)
        localStorage.setItem('QuestionnaireData', this.QuestionnaireDataStr)
      } else {
        this.getItemFromLocalStorage = [...this.getItemFromLocalStorage, this.QuestionnaireData]
        this.QuestionnaireDataStr = JSON.stringify(this.getItemFromLocalStorage)
        localStorage.setItem('QuestionnaireData', this.QuestionnaireDataStr)
      }
    }
    this.backToList()

  }

  private S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  public backToList() {
    this.router.navigate(['/questionnaire/list']);
  }
}
