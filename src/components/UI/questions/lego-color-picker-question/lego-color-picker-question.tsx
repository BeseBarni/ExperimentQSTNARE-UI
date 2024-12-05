import { QuestionWrapper } from "src/components";
import { IQuestionProps } from "src/models";
import LegoWhite from "../../../../assets/lego_white.png";
import LegoBackground from "../../../../assets/lego_white_background.png";
import { ColorResult, Sketch } from "@uiw/react-color";
import { useState } from "react";
import { Popover } from "@mui/material";
type LegoColorPickerQuestionSchema = {
  color: string;
};

export default function LegoColorPickerQuestion({
  title,
  value,
  setValue,
  edit = true,
  questionNumber,
}: IQuestionProps<LegoColorPickerQuestionSchema>) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const onColorChange = (color: ColorResult) => {
    setValue(color.hexa);
  };
  return (
    <QuestionWrapper questionNumber={questionNumber} title={title}>
      <div className="flex justify-center">
        <button onClick={handleClick}>
          <div className="relative">
            <img className="w-96 h-96 z-0" src={LegoWhite} alt="Lego" />
            <img
              className="w-96 h-96 z-20 top-0 left-0 absolute"
              src={LegoBackground}
              alt="Lego"
            />
            <div
              style={{ background: value }}
              className="w-full h-full z-10 mix-blend-multiply absolute top-0 left-0"
            ></div>
          </div>
        </button>
        {edit && (
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 300,
              horizontal: 300,
            }}
          >
            <Sketch color={value ?? "#FFFFFF"} onChange={onColorChange} />
          </Popover>
        )}
      </div>
    </QuestionWrapper>
  );
}
