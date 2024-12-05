import { useNavigate, useSearchParams } from "react-router-dom";
import Api from "src/api";
import { RegisterForm, RegisterFormProvider } from "src/components";

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="font-bold text-5xl">Register new participant</h1>
      <RegisterFormProvider experimentCode={searchParams.get("experimentCode")}>
        <RegisterForm
          onSubmit={(data) => {
            Api.participantPost(data).then((res) => {
              navigate("/participants/" + res.data.id);
            });
          }}
        />
      </RegisterFormProvider>
    </div>
  );
}
