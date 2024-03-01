import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import "../NoteFirst/Notefirst.css";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import Paper from '@mui/material/Paper';

function Notefirst({toggledata}) {
  
  return (
    <div className="parent">
      <div className="container" onClick={toggledata}>
      <Paper elevation={6} className="paper">
       <div>
        <TextField
        id="standard-basic"
        variant="standard"
        placeholder="Take Note..."
        fullWidth
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment>

              <IconButton>
                <CheckBoxOutlinedIcon />
              </IconButton>

              <IconButton>
                <BrushOutlinedIcon/>
              </IconButton>

              <IconButton>
                <ImageOutlinedIcon/>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  </Paper>
</div>
    </div>
  );
}

export default Notefirst;
