import { answerKeys } from "src/utilities";
import { ForwardProps } from "src/models";
import { IAnswerProps } from "src/models/answer";

type AnswerRendererProps = {
  type: string;
} & IAnswerProps<any>;

export default function AnswerRenderer({
  type,
  title,
  schema,
  value,
  ...props
}: AnswerRendererProps & ForwardProps) {
  const Answer = answerKeys[type as keyof typeof answerKeys];
  return <Answer {...props} value={value} title={title} schema={schema} />;
}
