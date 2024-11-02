import { LeastToMostQuestion } from "src/components";
import LegoColorPickerQuestion from "src/components/UI/questions/lego-color-picker-question/lego-color-picker-question";
import { IQuestionProps } from "src/models";

type QuestionKeysType = {
  [key: string]: React.FC<IQuestionProps<any>>;
};

export const questionKeys: QuestionKeysType = {
  leasttomost: LeastToMostQuestion,
  colorpicker: LegoColorPickerQuestion,
};
