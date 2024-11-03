import { RegisterForm, RegisterFormProvider } from "src/components";

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-5xl">Register new participant</h1>
      <RegisterFormProvider>
        <RegisterForm
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      </RegisterFormProvider>
    </div>
  );
}
