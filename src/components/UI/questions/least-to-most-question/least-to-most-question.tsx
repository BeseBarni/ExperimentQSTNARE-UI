type LeastToMostQuestionProps = {
  questionNumber: number;
  title: string;
  leastText: string;
  mostText: string;
};

export default function LeastToMostQuestion({
  title,
  leastText,
  mostText,
  questionNumber,
}: LeastToMostQuestionProps) {
  return (
    <div className="flex flex-col bg-white rounded-lg p-2">
      <div className="flex justify-center gap-2 items-center">
        <p className="font-bold">Q{questionNumber}</p>
        <p className="font-medium">{title}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-medium">{leastText}</p>
        <div className="flex justify-between"></div>
        <p className="font-medium">{mostText}</p>
      </div>
    </div>
  );
}
