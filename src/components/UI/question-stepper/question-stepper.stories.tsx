import { Meta } from "@storybook/react";
import QuestionStepper from "./question-stepper";

const meta: Meta<typeof QuestionStepper> = {
  title: "Questions/QuestionStepper",
  component: QuestionStepper,
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
    questions: [
      {
        id: 1,
        name: "How do you percieve the color of the ligthing in the room?",
        group: "Perception",
        schema: '{ "least": "Cold", "most": "Warm", "range": 7 }',
      },
      {
        id: 2,
        name: "How do you percieve the temperature in the room?",
        group: "Feeling",
        schema: '{ "least": "Cool", "most": "Hot", "range": 5 }',
      },
      {
        id: 3,
        name: "How do you percieve the color of the ligthing in the room?",
        group: "Perception",
        schema: '{ "least": "Cold", "most": "Warm", "range": 7 }',
      },
      {
        id: 4,
        name: "How do you percieve the temperature in the room?",
        group: "Feeling",
        schema: '{ "least": "Cool", "most": "Hot", "range": 5 }',
      },
      {
        id: 5,
        name: "How do you percieve the color of the ligthing in the room?",
        group: "Perception",
        schema: '{ "least": "Cold", "most": "Warm", "range": 7 }',
      },
      {
        id: 6,
        name: "How do you percieve the temperature in the room?",
        group: "Feeling",
        schema: '{ "least": "Cool", "most": "Hot", "range": 5 }',
      },
    ],
  },
};
