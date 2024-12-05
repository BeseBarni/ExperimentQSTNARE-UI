import { Radio, RadioGroup } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "src/app/app-provider";
import { QuestionWrapper } from "src/components";
import { IQuestionProps, LeastToMostSchema } from "src/models";

export default function LeastToMostQuestion({
  title,
  schema,
  questionNumber,
  value,
  setValue,
  edit = true,
  ...props
}: IQuestionProps<LeastToMostSchema>) {
  const { windowWidth } = useContext(AppContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const radioGroupClasses = `flex ${
    windowWidth > 640 ? "justify-between" : "justify-center"
  } items-center`;

  return (
    <QuestionWrapper {...props} questionNumber={questionNumber} title={title}>
      <div className={radioGroupClasses}>
        {windowWidth > 640 && <p className="font-medium">{schema.least}</p>}
        <RadioGroup row value={value} onChange={edit ? handleChange : () => {}}>
          {Array(schema.range)
            .fill(0)
            .map((_, index: number) =>
              edit ? (
                <Radio
                  sx={{ padding: windowWidth > 640 ? "0.5rem" : 0 }}
                  value={index}
                  key={index}
                />
              ) : (
                <Radio
                  onClick={() => {}}
                  sx={{ padding: windowWidth > 640 ? "0.5rem" : 0 }}
                  value={index}
                  key={index}
                />
              )
            )}
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
