import { FieldValues, Path } from "react-hook-form";

export type FormProps<TField extends FieldValues> = {
  name: Path<TField>;
  label: string;
};

export const formGap = 2;
