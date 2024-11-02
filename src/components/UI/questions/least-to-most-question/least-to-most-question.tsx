import { Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { QuestionWrapper } from "src/components";
import { IQuestionProps } from "src/models";

type LeastToMostQuestionSchema = {
  least: string;
  most: string;
  range: number;
};

export default function LeastToMostQuestion({
  title,
  schema,
  questionNumber,
  ...props
}: IQuestionProps<LeastToMostQuestionSchema>) {
  const [value, setValue] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <QuestionWrapper questionNumber={questionNumber} title={title}>
      <div className="flex justify-between items-center">
        <p className="font-medium">{schema.least}</p>
        <RadioGroup row value={value} onChange={handleChange}>
          {Array(schema.range)
            .fill(0)
            .map((_, index: number) => (
              <Radio value={index} key={index} />
            ))}
        </RadioGroup>
        <p className="font-medium">{schema.most}</p>
      </div>
    </QuestionWrapper>
  );
}
