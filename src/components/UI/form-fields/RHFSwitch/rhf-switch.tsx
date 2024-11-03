import { FormControlLabel, Switch } from "@mui/material";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { FormProps } from "src/models";

type RHFSwitchProps<TField extends FieldValues> = {
  [key: string]: any;
} & FormProps<TField>;

export default function RHFSwitch<TField extends FieldValues>({
  name,
  label,
  ...props
}: RHFSwitchProps<TField>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const { onChange, value } = field;
        return (
          <FormControlLabel
            {...props}
            control={<Switch checked={value} onChange={onChange} />}
            label={label}
          />
        );
      }}
    />
  );
}
