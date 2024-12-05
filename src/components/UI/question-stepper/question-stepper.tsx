import { useEffect, useState } from "react";
import { AnswerPostDto, QuestionDto } from "src/api/generated";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Button } from "@mui/material";
import { QuestionRenderer } from "../question-renderer";
import { ForwardProps } from "src/models";
import Api from "src/api";

type QuestionStepperProps = {
  participantId: string;
  answerGroupName: string;
  questions: QuestionDto[];
  finishedCallback: () => void;
};

export default function QuestionStepper({
  participantId,
  answerGroupName,
  questions,
  finishedCallback,
  ...props
}: QuestionStepperProps & ForwardProps) {
  const [activeStep, setActiveStep] = useState(0);

  const questionsData = [];
  for (let i = 0; i < questions.length; i++) {
    questionsData.push({
      questionId: questions[i].id,
      value: questions[i].formData ?? null,
    });
  }
  const [formData, setFormData] = useState(questionsData);

  const handleNext = () => {
    setActiveStep((step) => (step < questions.length - 1 ? step + 1 : 0));
  };
  const handleBack = () => {
    setActiveStep((step) => (step > 0 ? step - 1 : questions.length - 1));
  };

  useEffect(() => {
    if (formData.every((element) => element.value)) {
      finishedCallback();
    }
  }, [formData, finishedCallback]);

  const handleSave = () => {
    let data = {
      participantId,
      answerList: [] as AnswerPostDto[],
      answerGroupName,
    };
    formData.forEach((element) => {
      if (element.value) {
        data.answerList.push({
          questionId: element.questionId,
          data: element.value.toString(),
        });
      }
    });
    Api.answerPost(data);
  };

  const handleIndex = (index: number) => {
    setActiveStep(index);
  };

  useEffect(() => {
    handleSave();
  }, [formData]);

  return (
    <div {...props} className="flex flex-col p-4 gap-2 h-full">
      <h1 className="font-bold text-lg">{questions[activeStep].group}</h1>
      <div className="flex">
        <Button onClick={handleBack}>
          <ArrowBackIosRoundedIcon />
        </Button>
        <div className="flex flex-row gap-2 w-full items-center justify-start overflow-x-auto">
          {questions.map((_, index) => (
            <Button
              key={index}
              className="rounded-md !w-4 !h-4 !min-h-4 !min-w-4"
              onClick={() => handleIndex(index)}
              style={{
                backgroundColor:
                  index === activeStep
                    ? "#6483FF"
                    : formData[index].value
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
      <div className="h-full w-full items-center justify-center flex">
        {
          <QuestionRenderer
            className="w-full lg:px-24 px-2"
            type={questions[activeStep].type}
            title={questions[activeStep].title}
            value={formData[activeStep].value}
            setValue={(value: string) => {
              const newFormData = [...formData];
              newFormData[activeStep] = {
                questionId: questions[activeStep].id,
                value,
              };
              setFormData(newFormData);
            }}
            schema={JSON.parse(questions[activeStep].schema)}
            questionNumber={activeStep + 1}
          />
        }
      </div>
    </div>
  );
}
