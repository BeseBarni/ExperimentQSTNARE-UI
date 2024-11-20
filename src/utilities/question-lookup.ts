import { LeastToMostAnswer, LeastToMostQuestion } from "src/components";
import LegoColorPickerQuestion from "src/components/UI/questions/lego-color-picker-question/lego-color-picker-question";
import { IQuestionProps } from "src/models";
import { IAnswerProps } from "src/models/answer";

type QuestionKeysType = {
  [key: string]: React.FC<IQuestionProps<any>>;
};

type AnswerKeysType = {
  [key: string]: React.FC<IAnswerProps<any>>;
};

export const questionKeys: QuestionKeysType = {
  leasttomost: LeastToMostQuestion,
  colorpicker: LegoColorPickerQuestion,
};

export const answerKeys: AnswerKeysType = {
  leasttomost: LeastToMostAnswer,
};
