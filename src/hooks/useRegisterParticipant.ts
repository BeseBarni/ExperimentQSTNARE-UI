import { useMutation } from "@tanstack/react-query";
import Api from "src/api";

export default function useRegisterParticipant() {
  const mutation = useMutation({
    mutationFn: Api.participantPost,
  });

  return mutation;
}
