import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import {Notescolor} from "../../../Services/NoteServices";

export default function ColorPopper({ setNotes, action, addNotes,obj}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const updateColor = (color) => {
    if (action === "create") {
      setNotes({ ...addNotes, color: color });
    }
  };
  
  const updatenextcolor = async (color) => {
      // console.log("colorChange method call sucess");
    if (action === "update") {
      let colordata = {
        noteIdList: [obj.id],
        color: color
      };
      
      let res = await Notescolor(colordata);
      // console.log(res);
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  let arr = ["#f5433b", "#3b42f5", "#f53be2", "#b1f53b", "#3bf570"];
  return (
    <div
      style={{
        height: "28px",
        width: "28px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        style={{ border: "none", background: "none" }}
      >
        <ColorLensOutlinedIcon />
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box
          sx={{
            border: 1,
            p: 1,
            bgcolor: "background.paper",
            display: "flex",
            gap: "5px",
          }}
        >
          {arr.map((color, index) => (
            <div
              key={index}
              style={{
                borderRadius: "50%",
                backgroundColor: color,
                height: "15px",
                width: "15px",
              }}
              onClick={() => {
                updateColor(color);
                updatenextcolor(color);
              }}
            ></div>
          ))}
        </Box>
      </Popper>
    </div>
  );
}
