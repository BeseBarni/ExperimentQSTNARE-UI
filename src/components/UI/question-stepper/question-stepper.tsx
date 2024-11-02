import { useState } from "react";
import { QuestionDto } from "src/api/generated";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Button } from "@mui/material";
import { QuestionRenderer } from "../question-renderer";

type QuestionStepperProps = {
  questions: QuestionDto[];
};

export default function QuestionStepper({ questions }: QuestionStepperProps) {
  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    setActiveStep((step) => (step < questions.length - 1 ? step + 1 : 0));
  };
  const handleBack = () => {
    setActiveStep((step) => (step > 0 ? step - 1 : questions.length - 1));
  };

  const handleIndex = (index: number) => {
    setActiveStep(index);
  };

  return (
    <div className="flex flex-col p-4 gap-2">
      <h1 className="font-bold text-lg">{questions[activeStep].group}</h1>
      <div className="flex">
        <Button onClick={handleBack}>
          <ArrowBackIosRoundedIcon />
        </Button>
        <div className="flex flex-row gap-2 w-full items-center justify-start overflow-x-auto">
          {questions.map((question, index) => (
            <Button
              key={index}
              className="rounded-md !w-4 !h-4 !min-h-4 !min-w-4"
              onClick={() => handleIndex(index)}
              style={{
                backgroundColor:
                  index === activeStep
                    ? "#6483FF"
                    : question.formData
                    ? "#00C300"
                    : "#D9D9D9",
              }}
            />
          ))}
        </div>
        <Button onClick={handleNext}>
          <ArrowForwardIosRoundedIcon />
        </Button>
      </div>
      <div>
        {
          <QuestionRenderer
            type={questions[activeStep].type}
            title={questions[activeStep].title}
            schema={JSON.parse(questions[activeStep].schema)}
            questionNumber={activeStep + 1}
          />
        }

        {/* {questions.map((question, index) => (
          <div
            className="p-6"
            style={{ display: index === activeStep ? "block" : "none" }}
          >
            <LeastToMostQuestion
              key={index}
              questionNumber={index + 1}
              title={question.name!}
              schema={JSON.parse(question.schema!)}
            />
          </div>
        ))} */}
      </div>
    </div>
  );
}
