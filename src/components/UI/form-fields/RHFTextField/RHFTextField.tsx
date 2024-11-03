import { TextField } from "@mui/material";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { FormProps } from "src/models";

type RHFTextFieldProps<TField extends FieldValues> = {
  variant?: "outlined" | "filled" | "standard";
  type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week"
    | "file"
    | "image"
    | "color";
} & FormProps<TField>;
export default function RHFTextField<TField extends FieldValues>({
  label,
  variant,
  type,
  name,
}: RHFTextFieldProps<TField>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...field}
            onChange={(e) =>
              field.onChange(
                type == "number" ? Number(e.target.value) : e.target.value
              )
            }
            type={type ?? "text"}
            label={label}
            fullWidth
            error={!!error}
            variant={variant ?? "outlined"}
            helperText={error?.message}
          />
        );
      }}
    />
  );
}
