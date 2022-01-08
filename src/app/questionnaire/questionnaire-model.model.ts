export interface QuestionnaireModel {
    id: string;
    questionType: string;
    question: string;
    submittedAnswer: any[];
    options: any[];
    correctAnswer: any[];
    isAnswered: boolean;
    createdDate: Date;
    updatedDate: Date | undefined;

}
