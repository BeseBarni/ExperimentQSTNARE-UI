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
  return (
    <div className="flex flex-col bg-white rounded-lg p-2" {...props}>
      <div className="flex gap-2 items-center">
        <p className="font-bold flex-1 left-0">Q{questionNumber}</p>
        <p className="font-medium flex-auto">{title}</p>
      </div>
      {children}
    </div>
  );
}
