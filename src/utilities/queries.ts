import Api from "src/api";

export const queries = {
  questionGet: (experimentCode: string, participantId: string) => {
    return {
      queryKey: ["questions", experimentCode],
      queryFn: () => Api.questionGet(experimentCode, participantId),
    };
  },
};
