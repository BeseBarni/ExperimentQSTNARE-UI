export interface IQuestionProps<TSchema> {
  title: string;
  schema: TSchema;
  questionNumber: number;
  edit?: boolean;
  defaultValue?: any;
  value?: any;
  setValue?: any;
}
