import { useSuspenseQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { QuestionStepper } from "src/components";
import { queries } from "src/utilities";
import Confetti from "react-confetti";

export default function QuestionsPage() {
  const [searchParams] = useSearchParams();
  const experimentCode = searchParams.get("experimentCode");
  const participantId = searchParams.get("participantId");
  const answerGroupName = searchParams.get("answerGroupName");
  const [finished, setFinished] = useState(false);
  const finishedCallback = () => {
    setFinished(true);
  };

  if (!experimentCode || !participantId || !answerGroupName) {
    throw new Error(
      "experimentCode and participantId and answerGroupName are required"
    );
  }

  const questions = useSuspenseQuery(
    queries.questionGet(experimentCode, participantId, answerGroupName)
  );

  const textRef = useRef<HTMLHeadingElement>(null);

  return (
    <>
      {!finished && (
        <QuestionStepper
          participantId={participantId}
          answerGroupName={answerGroupName}
          className="top-auto bottom-auto"
          questions={questions.data.data}
          finishedCallback={finishedCallback}
        />
      )}
      {finished && (
        <div className="w-full h-full flex justify-center  items-center">
          <h1 ref={textRef} className="text-4xl justify-center text-center">
            Thank you for your participation
          </h1>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}
    </>
  );
}
