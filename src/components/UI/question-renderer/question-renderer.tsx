import { questionKeys } from "src/utilities";
import { ForwardProps, IQuestionProps } from "src/models";

type QuestionRendererProps = {
  type: string;
} & IQuestionProps<any>;

export default function QuestionRenderer({
  type,
  title,
  schema,
  value,
  setValue,
  questionNumber,
  ...props
}: QuestionRendererProps & ForwardProps) {
  const Question = questionKeys[type as keyof typeof questionKeys];
  return (
    <Question
      {...props}
      title={title}
      schema={schema}
      value={value}
      setValue={setValue}
      questionNumber={questionNumber}
    />
  );
}
