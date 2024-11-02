import { QuestionWrapper } from "src/components";
import { IQuestionProps } from "src/models";

type LegoColorPickerQuestionSchema = {
  color: string;
};

export default function LegoColorPickerQuestion({
  title,
  schema,
  questionNumber,
}: IQuestionProps<LegoColorPickerQuestionSchema>) {
  return (
    <QuestionWrapper questionNumber={questionNumber} title={title}>
      <div></div>
    </QuestionWrapper>
  );
}
