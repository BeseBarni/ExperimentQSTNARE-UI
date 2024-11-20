import Api from "src/api";

export const queries = {
  questionGet: (experimentCode: string, participantId: string) => {
    return {
      queryKey: ["questions", experimentCode],
      queryFn: () => Api.questionGet(experimentCode, participantId),
    };
  },
  majorList: (facultyCode: string) => {
    return {
      queryKey: ["majors", facultyCode],
      queryFn: () => Api.majorFacultyCodeGet(facultyCode),
    };
  },
  facultyList: () => {
    return {
      queryKey: ["faculties"],
      queryFn: () => Api.facultyGet(),
    };
  },
  experimentList: () => {
    return {
      queryKey: ["experiments"],
      queryFn: () => Api.experimentGet(),
    };
  },
  participant: (participantId: string) => {
    return {
      queryKey: ["participant", participantId],
      queryFn: () => Api.participantIdGet(participantId),
    };
  },
  participantList: (experimentCode: string) => {
    return {
      queryKey: ["participantList", experimentCode],
      queryFn: () => Api.participantGet(experimentCode),
    };
  },
  participantAnswerList: (participantId: string, experimentCode: string) => {
    return {
      queryKey: ["participantAnswerList", experimentCode, participantId],
      queryFn: () => Api.participantIdAnswerGet(participantId, experimentCode),
    };
  },
};
