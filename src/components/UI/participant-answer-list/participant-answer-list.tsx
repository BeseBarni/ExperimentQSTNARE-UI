import { List, Stack, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queries } from "src/utilities";
import { AnswerRenderer } from "../answer-renderer";
import { QuestionRenderer } from "../question-renderer";
import { ForwardProps } from "src/models";

type ParticipantAnswerListProps = {
  participantId: string;
  experimentCode: string;
};

type Question = {
  answer: string;
  id: string;
  title: string;
  group: string;
  type: string;
  schema: string;
};

type GroupedQuestions = {
  [key: string]: Question[];
};

export default function ParticipantAnswerList({
  participantId,
  experimentCode,
  ...props
}: ParticipantAnswerListProps & ForwardProps) {
  const participantAnswerList = useSuspenseQuery(
    queries.participantAnswerList(participantId, experimentCode)
  );

  const answers = (
    participantAnswerList.data.data.flatMap((p) => {
      return {
        title: p.question!.title,
        id: p.question!.id,
        group: p.question!.group,
        answer: p.value,
        type: p.question?.type,
        schema: p.question?.schema,
      };
    }) as Question[]
  ).reduce<GroupedQuestions>((acc, curr) => {
    if (curr.group) {
      acc[curr.group] = [...(acc[curr.group] || []), curr];
    }
    return acc;
  }, {});
  let index = 1;
  console.log("answers", answers);
  return (
    <div {...props}>
      {Object.entries(answers).map(([group, questions]) => (
        <div className="w-full h-full" key={group}>
          <Typography
            sx={{ paddingBottom: "2rem", paddingTop: "2rem" }}
            variant="h3"
          >
            {group}
          </Typography>
          <Stack gap={4}>
            {questions.map((q) => (
              <QuestionRenderer
                questionNumber={index++}
                type={q.type}
                title={q.title}
                schema={JSON.parse(q.schema)}
                defaultValue={+q.answer}
                edit={false}
              />
            ))}
          </Stack>
        </div>
      ))}
    </div>
  );
}
