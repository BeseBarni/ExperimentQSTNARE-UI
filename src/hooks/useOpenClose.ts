/* eslint-disable check-file/filename-naming-convention */
import { useCallback, useState } from "react";

export const useOpenClose = (
  initialState: boolean = false
): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return [isOpen, open, close];
};
