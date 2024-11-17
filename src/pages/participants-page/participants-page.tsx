import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { queries } from "src/utilities";
import LoadingPageSuspense from "../loading-page-suspense/loading-page-suspense";
type ParticipantProps = {
  experimentCode: string;
};
function createData(
  id: string,
  firstName: string,
  lastName: string,
  age: number,
  major?: string | null,
  profession?: string | null
) {
  return { id, firstName, lastName, age, major, profession };
}

const Participants = ({ experimentCode }: ParticipantProps) => {
  const participants = useSuspenseQuery(
    queries.participantList(experimentCode!)
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Major</TableCell>
            <TableCell>Profession</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.data.data
            .map((p) =>
              createData(
                p.id!,
                p.forname!,
                p.surname!,
                12,
                p.major?.name,
                p.profession
              )
            )
            .map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Link component={RouterLink} to={`${row.id}`}>
                    {row.firstName}
                  </Link>
                </TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.major}</TableCell>
                <TableCell>{row.profession}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default function ParticipantsPage() {
  const experiments = useSuspenseQuery(queries.experimentList());
  const [experimentCode, setExperimentCode] = useState<string>(
    experiments.data.data[0].code!
  );

  const options = experiments.data.data.map((e) => {
    return { label: e.name!, id: e.code! };
  });
  return (
    <Box>
      <div className="flex flex-row justify-between w-full items-center">
        <Typography variant="h2" className="flex-1">
          Participants
        </Typography>
        <Autocomplete
          className="flex-1"
          options={options}
          value={options.find((e) => e.id === experimentCode)}
          onChange={(_, newValue) => {
            setExperimentCode(newValue!.id);
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
        <div className="flex flex-1 justify-end">
          <Button disabled={!experimentCode}>Add participant</Button>
        </div>
      </div>
      <LoadingPageSuspense loadingText={""}>
        <Participants experimentCode={experimentCode!} />
      </LoadingPageSuspense>
    </Box>
  );
}
