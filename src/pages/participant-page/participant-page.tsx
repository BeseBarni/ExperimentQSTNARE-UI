import {
  Autocomplete,
  Box,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { queries } from "src/utilities";

export default function ParticipantPage() {
  const [experimentCode, setExperimentCode] = useState<string | null>(null);
  const { id } = useParams();
  const participant = useSuspenseQuery(queries.participant(id!));
  const experiments = useSuspenseQuery(queries.experimentList());

  const options = experiments.data.data.map((e) => {
    return { label: e.name!, id: e.code! };
  });
  return (
    <Box>
      <Stack>
        <Typography variant="h1">
          {`${participant.data.data.forname} ${participant.data.data.surname}`}
        </Typography>
        <Autocomplete
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
        <Link
          component={ReactRouterLink}
          to={`/questions?experimentCode=${experimentCode}&participantId=${id}`}
          replace={true}
        >
          Questionare
        </Link>
      </Stack>
    </Box>
  );
}
