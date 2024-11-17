import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { QuestionStepper } from "src/components";
import { queries } from "src/utilities";

export default function QuestionsPage() {
  const [searchParams] = useSearchParams();
  const experimentCode = searchParams.get("experimentCode");
  const participantId = searchParams.get("participantId");

  if (!experimentCode || !participantId) {
    throw new Error("experimentCode and participantId are required");
  }

  const questions = useSuspenseQuery(
    queries.questionGet(experimentCode, participantId)
  );

  return (
    <QuestionStepper
      className="top-auto bottom-auto"
      questions={questions.data.data}
    />
  );
}
