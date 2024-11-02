import { questionKeys } from "src/utilities";
import { IQuestionProps } from "src/models";

type QuestionRendererProps = {
  type: string;
} & IQuestionProps<any>;

export default function QuestionRenderer({
  type,
  title,
  schema,
  questionNumber,
}: QuestionRendererProps) {
  const Question = questionKeys[type as keyof typeof questionKeys];
  return (
    <Question title={title} schema={schema} questionNumber={questionNumber} />
  );
}
