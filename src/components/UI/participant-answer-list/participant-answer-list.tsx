import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queries } from "src/utilities";
import { QuestionRenderer } from "../question-renderer";
import { ForwardProps } from "src/models";
import { useState } from "react";
import { AnswerDto } from "src/api/generated";

type ParticipantAnswerListProps = {
  participantId: string;
  experimentCode: string;
  participantName: string;
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
  participantName,
  ...props
}: ParticipantAnswerListProps & ForwardProps) {
  const participantAnswerList = useSuspenseQuery(
    queries.participantAnswerList(participantId, experimentCode)
  ).data.data;

  const [answerGroupName, setAnswerGroupName] = useState<string | undefined>(
    undefined
  );

  const handleGroupNameChange = (event: SelectChangeEvent) => {
    setAnswerGroupName(event.target.value as string);
  };

  const answers = (answerList: AnswerDto[]) =>
    (
      answerList?.flatMap((p) => {
        return {
          title: p.question!.title,
          id: p.question!.id,
          group: p.question!.group,
          answer: p.value,
          type: p.question?.type,
          schema: p.question?.schema,
        };
      }) as Question[]
    )?.reduce<GroupedQuestions>((acc, curr) => {
      if (curr.group) {
        acc[curr.group] = [...(acc[curr.group] || []), curr];
      }
      return acc;
    }, {}) ?? [];
  let index = 1;
  return (
    <div {...props}>
      <Stack sx={{ display: "flex" }} direction="row">
        <Typography sx={{ flex: 1 }} variant="h3">
          {participantName}
        </Typography>
        <FormControl fullWidth sx={{ width: "100%", flex: 1 }}>
          <InputLabel id="answerGroupSelectLabel">Answergroup name</InputLabel>
          <Select
            labelId="answerGroupSelectLabel"
            id="answerGroupSelect"
            label="Answergroup name"
            value={answerGroupName}
            onChange={handleGroupNameChange}
          >
            {participantAnswerList.map((group) => {
              return <MenuItem value={group.name!}>{group.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Stack>
      {Object.entries(
        answers(
          participantAnswerList.find((p) => p.name == answerGroupName)
            ?.answers ?? []
        )
      ).map(([group, questions]) => (
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
                value={q.answer}
                edit={false}
              />
            ))}
          </Stack>
        </div>
      ))}
    </div>
  );
}
