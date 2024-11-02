import { CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { QuestionStepper } from "src/components";
import { useQuestionList } from "src/hooks";

export default function QuestionsPage() {
  const [searchParams] = useSearchParams();
  const experimentCode = searchParams.get("experimentCode");
  const participantId = searchParams.get("participantId");

  if (!experimentCode || !participantId) {
    throw new Error("experimentCode and participantId are required");
  }

  const [data, loading, error] = useQuestionList(experimentCode, participantId);

  return loading ? (
    <CircularProgress />
  ) : (
    <div>
      <QuestionStepper questions={data!} />
    </div>
  );
}
