import { useContext } from "react";
import { AppContext } from "src/app/app-provider";

type QuestionWrapperProps = {
  questionNumber: number;
  title: string;
  children: React.ReactNode;
  [key: string]: any;
};

export default function QuestionWrapper({
  questionNumber,
  title,
  children,
  ...props
}: QuestionWrapperProps) {
  const { windowWidth } = useContext(AppContext);
  const titleClasses = `font-medium ${
    windowWidth > 440 ? "text-lg" : "text-base text-center"
  } flex-auto`;
  return (
    <div className="flex flex-col bg-white rounded-lg p-2" {...props}>
      {windowWidth <= 440 && (
        <p className="font-bold flex-1 left-0">Q{questionNumber}</p>
      )}
      <div className="flex gap-2 items-center">
        {windowWidth > 440 && (
          <p className="font-bold flex-1 left-0">Q{questionNumber}</p>
        )}
        <p className={titleClasses}>{title}</p>
      </div>
      {children}
    </div>
  );
}
