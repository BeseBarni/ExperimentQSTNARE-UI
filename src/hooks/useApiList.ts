// eslint-disable-next-line check-file/filename-naming-convention
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export function useApiList<TDto>(query: {
  queryKey: string[];
  queryFn: () => Promise<AxiosResponse<TDto[], unknown>>;
}): [
  data: TDto[] | undefined,
  isLoading: boolean,
  isError: boolean,
  error: Error | null
] {
  const { data, isLoading, isError, error } = useQuery({
    ...query,
  });
  return [data?.data ?? [], isLoading, isError, error];
}
