import { Autocomplete, TextField } from "@mui/material";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { FormProps, Option } from "src/models";

type RHFAutocompleteProps<TField extends FieldValues> = {
  options: Option[];
  multiple?: boolean;
  [key: string]: any;
} & FormProps<TField>;

export default function RHFAutocomplete<TField extends FieldValues>({
  name,
  options,
  label,
  multiple,
  ...props
}: RHFAutocompleteProps<TField>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <Autocomplete
            {...props}
            multiple={multiple}
            value={
              multiple
                ? value.map((id: string) =>
                    options.find((option) => option.id === id)
                  )
                : options.find((option) => option.id === value) ?? null
            }
            onChange={(_, newValue) => {
              onChange(
                multiple
                  ? newValue.map((option: Option) => option.id)
                  : newValue?.id ?? ""
              );
            }}
            options={options}
            getOptionLabel={(option) =>
              options.find((o) => o.id === option.id)?.label ?? ""
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                fullWidth
                variant="outlined"
                inputRef={ref}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        );
      }}
    />
  );
}
