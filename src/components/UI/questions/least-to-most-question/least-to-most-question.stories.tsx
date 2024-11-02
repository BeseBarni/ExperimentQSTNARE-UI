import { Meta } from "@storybook/react";
import LeastToMostQuestion from "./least-to-most-question";
import "src/index.css";
const meta: Meta<typeof LeastToMostQuestion> = {
  title: "Questions/LeastToMostQuestion",
  component: LeastToMostQuestion,
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
    title: "How do you percieve the color of the ligthing in the room?",
    questonNumber: 1,
    schema: {
      least: "Cold",
      most: "Warm",
      range: 7,
    },
  },
};
