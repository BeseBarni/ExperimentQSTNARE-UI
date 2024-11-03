import { Meta } from "@storybook/react";
import "src/index.css";
import RegisterPage from "./register-page";
const meta: Meta<typeof RegisterPage> = {
  title: "Pages/RegisterPage",
  component: RegisterPage,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
};

export default meta;

export const Default = {
  args: {},
};
