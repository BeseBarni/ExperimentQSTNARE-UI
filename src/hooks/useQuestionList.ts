// eslint-disable-next-line check-file/filename-naming-convention
import { useApiList } from "./useApiList";
import { queries } from "src/utilities";

export const useQuestionList = (
  experimentCode: string,
  participantId: string
) => {
  return useApiList(queries.questionGet(experimentCode, participantId));
};
