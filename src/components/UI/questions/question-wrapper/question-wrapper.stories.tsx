import { Meta } from "@storybook/react";
import QuestionWrapper from "./question-wrapper";

const meta: Meta<typeof QuestionWrapper> = {
  title: "Questions/QuestionWrapper",
  component: QuestionWrapper,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
};

export default meta;

export const Default = {
  args: {
    title: "Please select the color you think the lego was.",
    questonNumber: 5,
    children: <div></div>,
  },
};
