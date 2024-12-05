import { UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Api from "src/api";
import { AnswerPostDto } from "src/api/generated";
export type AnswerPostMutation = {
  participantId: string;
  answerList: AnswerPostDto[];
};
export const mutations = {
  answerPost: (): UseMutationOptions<
    AxiosResponse<void, any>,
    Error,
    AnswerPostMutation,
    unknown
  > => {
    return {
      mutationFn: (data: AnswerPostMutation) =>
        Api.answerPost({
          participantId: data.participantId,
          answerList: data.answerList,
        }),
    };
  },
};
