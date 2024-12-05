import { SubmitHandler, useFormContext, useWatch } from "react-hook-form";
import { formGap as gap } from "src/models";
import { Button, Container, Stack } from "@mui/material";
import { defaultValues, RegisterSchema } from "src/models/schema";
import { RHFAutocomplete, RHFTextField, RHFSwitch } from "src/components";
import { useEffect } from "react";
import { queries } from "src/utilities";
import { useApiList } from "src/hooks/useApiList";

type RegisterFormProps = {
  onSubmit: SubmitHandler<RegisterSchema>;
  onCancel?: () => void;
  onClear?: () => void;
};
export default function RegisterForm({
  onCancel,
  onClear,
  onSubmit,
}: RegisterFormProps) {
  const { control, unregister, handleSubmit, reset, formState } =
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

  const major = useApiList(queries.majorList(faculty));
  const facultyList = useApiList(queries.facultyList());
  const experimentList = useApiList(queries.experimentList());

  useEffect(() => {
    if (!isUniversity) {
      unregister("faculty");
      unregister("major");
    }
    if (faculty === "") {
      unregister("major");
    }
  }, [isUniversity, faculty, unregister]);

  const handleOnClear = () => {
    if (formState.isDirty) {
      reset(defaultValues);
    }
    onClear?.();
  };

  return (
    <Container component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap, padding: 4 }}>
        <Stack direction="row" sx={{ gap }}>
          <RHFTextField<RegisterSchema> name="forName" label="Name" />
          <RHFTextField<RegisterSchema> name="surName" label="Name" />
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
                options={
                  facultyList[0]?.map((p) => {
                    return {
                      label: p.name!,
                      id: p.code!,
                    };
                  }) ?? []
                }
                label="Faculty"
              />
              {faculty.length !== 0 ? (
                <RHFAutocomplete<RegisterSchema>
                  sx={{ width: "100%" }}
                  name="major"
                  options={
                    major[0]?.map((p) => {
                      return {
                        label: p.name!,
                        id: p.code!,
                      };
                    }) ?? []
                  }
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
          options={
            experimentList[0]?.map((p) => {
              return {
                label: p.name!,
                id: p.code!,
              };
            }) ?? []
          }
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
