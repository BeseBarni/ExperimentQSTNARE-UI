import { Meta } from "@storybook/react";
import LegoColorPickerQuestion from "./lego-color-picker-question";

const meta: Meta<typeof LegoColorPickerQuestion> = {
  title: "Questions/LegoColorPickerQuestion",
  component: LegoColorPickerQuestion,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
};

export default meta;

export const Default = {
  args:{
    title:"Please select the color you think the lego was.",
    questonNumber:5,
    schema:{
      "color": "#FFFFFF"
    },
  },
};
