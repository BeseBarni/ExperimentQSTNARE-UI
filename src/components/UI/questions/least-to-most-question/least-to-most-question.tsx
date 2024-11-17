import { Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [value, setValue] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setWindowWidth]);

  const radioGroupClasses = `flex ${
    windowWidth > 640 ? "justify-between" : "justify-center"
  } items-center`;

  return (
    <QuestionWrapper {...props} questionNumber={questionNumber} title={title}>
      <div className={radioGroupClasses}>
        {windowWidth > 640 && <p className="font-medium">{schema.least}</p>}
        <RadioGroup row value={value} onChange={handleChange}>
          {Array(schema.range)
            .fill(0)
            .map((_, index: number) => (
              <Radio
                sx={{ padding: windowWidth > 640 ? "0.5rem" : 0 }}
                value={index}
                key={index}
              />
            ))}
        </RadioGroup>
        {windowWidth > 640 && <p className="font-medium">{schema.most}</p>}
      </div>
      {windowWidth <= 640 && (
        <div className="flex justify-between">
          <p className="font-medium">{schema.least}</p>
          <p className="font-medium">{schema.most}</p>
        </div>
      )}
    </QuestionWrapper>
  );
}
