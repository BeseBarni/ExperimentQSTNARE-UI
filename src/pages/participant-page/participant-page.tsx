import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { ParticipantAnswerList } from "src/components";
import { usePDF } from "react-to-pdf";
import { queries } from "src/utilities";
import LoadingPageSuspense from "../loading-page-suspense/loading-page-suspense";

export default function ParticipantPage() {
  const { id } = useParams();
  if (!id) throw new Error("id is required");
  const [experimentCode, setExperimentCode] = useState<string | null>(null);
  const [answerGroupName, setAnswerGroupName] = useState<string | null>(null);
  const participant = useSuspenseQuery(queries.participant(id!));
  const experiments = useSuspenseQuery(queries.experimentList());

  const { toPDF, targetRef } = usePDF({
    filename: "page.pdf",
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: 10,
      // default is 'A4'
      format: "A4",

      // default is 'portrait'
    },
  });

  const options = experiments.data.data.map((e) => {
    return { label: e.name!, id: e.code! };
  });
  return (
    <Box>
      <Stack gap={4}>
        <Stack direction="row" sx={{ display: "flex", gap: "1rem" }}>
          <div className="flex-1 flex flex-row gap-4">
            <TextField
              sx={{ width: "100%" }}
              label="Answergroup name"
              value={answerGroupName}
              onChange={(event) =>
                setAnswerGroupName(event.target.value ?? null)
              }
            />
            <Autocomplete
              sx={{ width: "100%" }}
              options={options}
              value={options.find((e) => e.id === experimentCode)}
              onChange={(_, newValue) => {
                setExperimentCode(newValue?.id ?? null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Experiment"
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Button
              disabled={!answerGroupName || !experimentCode}
              sx={{ width: "100%" }}
              variant="contained"
              component={ReactRouterLink}
              to={`/questions?experimentCode=${experimentCode}&participantId=${id}&answerGroupName=${answerGroupName}`}
              replace={true}
            >
              Start questionare
            </Button>
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              onClick={() => toPDF()}
            >
              Print
            </Button>
          </div>
        </Stack>
        <LoadingPageSuspense loadingText="">
          {!!experimentCode && (
            <div ref={targetRef}>
              <ParticipantAnswerList
                participantId={id}
                experimentCode={experimentCode}
                participantName={`${participant.data.data.forname} ${participant.data.data.surname}`}
              />
            </div>
          )}
        </LoadingPageSuspense>
      </Stack>
    </Box>
  );
}
