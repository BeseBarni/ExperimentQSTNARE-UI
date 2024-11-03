import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  defaultValues,
  RegisterSchema,
  registerSchema,
} from "src/models/schema";

type RegisterFormProviderProps = {
  children: React.ReactNode;
};

export default function RegisterFormProvider({
  children,
}: RegisterFormProviderProps) {
  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues,
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  return (
    <FormProvider {...methods}>
      {children}
      <DevTool control={methods.control} />
    </FormProvider>
  );
}
