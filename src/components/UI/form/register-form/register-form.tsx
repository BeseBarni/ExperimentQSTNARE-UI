import { SubmitHandler, useFormContext, useWatch } from "react-hook-form";
import { formGap as gap } from "src/models";
import { Button, Container, Stack } from "@mui/material";
import { defaultValues, RegisterSchema } from "src/models/schema";
import { RHFAutocomplete, RHFTextField, RHFSwitch } from "src/components";
import { useEffect } from "react";

type RegisterFormProps = {
  onSubmit: SubmitHandler<RegisterSchema>;
  onCancel?: () => void;
  onClear?: () => void;
};
export default function RegisterForm({ onCancel, onClear }: RegisterFormProps) {
  const { control, unregister, handleSubmit, reset } =
    useFormContext<RegisterSchema>();
  const isUniversity = useWatch({
    control,
    name: "isUniversity",
  });
  const faculty = useWatch({
    control,
    name: "faculty",
    defaultValue: "",
  });

  useEffect(() => {
    console.log("useEffect", isUniversity, faculty);
    if (!isUniversity) {
      unregister("faculty");
      unregister("major");
    }
    if (faculty === "") {
      unregister("major");
    }
  }, [isUniversity, faculty, unregister]);

  const handleOnClear = () => {
    console.log("clear", defaultValues);
    reset(defaultValues);
    onClear?.();
  };

  const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
    console.log("data", data);
  };

  return (
    <Container component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap, padding: 4 }}>
        <Stack direction="row" sx={{ gap }}>
          <RHFTextField<RegisterSchema> name="name" label="Name" />
          <RHFTextField<RegisterSchema> name="email" label="Email" />
        </Stack>
        <RHFTextField<RegisterSchema> type="number" name="age" label="Age" />
        <RHFTextField<RegisterSchema> name="profession" label="Profession" />

        <Stack
          direction="row"
          sx={{ gap, alignItems: "center", minHeight: 56 }}
        >
          <RHFSwitch
            sx={{ width: "100%" }}
            name="isUniversity"
            label="University Of Pannonia"
          />
          {isUniversity && (
            <>
              <RHFAutocomplete<RegisterSchema>
                sx={{ width: "100%" }}
                name="faculty"
                options={[
                  { label: "asd", id: "asd" },
                  { label: "dsa", id: "dsa" },
                ]}
                label="Faculty"
              />
              {faculty.length !== 0 ? (
                <RHFAutocomplete<RegisterSchema>
                  sx={{ width: "100%" }}
                  name="major"
                  options={[
                    { label: "asd", id: "asd" },
                    { label: "dsa", id: "dsa" },
                  ]}
                  label="Major"
                />
              ) : (
                <div className="w-full" />
              )}
            </>
          )}
        </Stack>
        <RHFAutocomplete<RegisterSchema>
          sx={{ width: "100%" }}
          name="experiment"
          options={[
            { label: "asd", id: "asd" },
            { label: "dsa", id: "dsa" },
          ]}
          label="Experiment"
        />
        <Stack direction="row">
          <Button type="submit">Register</Button>
          <Button type="button" onClick={handleOnClear}>
            Clear
          </Button>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
