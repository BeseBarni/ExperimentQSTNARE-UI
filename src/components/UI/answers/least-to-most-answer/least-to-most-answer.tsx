import { Radio, RadioGroup } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "src/app/app-provider";
import { LeastToMostSchema } from "src/models";
import { IAnswerProps } from "src/models/answer";

export default function LeastToMostAnswer({
  schema,
}: IAnswerProps<LeastToMostSchema>) {
  const { windowWidth } = useContext(AppContext);
  const [value, setValue] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const radioGroupClasses = `flex ${
    windowWidth > 640 ? "justify-between" : "justify-center"
  } items-center`;
  return (
    <>
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
    </>
  );
}
