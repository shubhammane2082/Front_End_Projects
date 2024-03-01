import React, { useState } from "react";
import {
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { TextareaAutosize } from "@mui/base";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import "../Notethird/Notethird.css";
import ColorPopper from "../popper/ColorPopper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { archiveNote } from "../../../Services/NoteServices";
import { deleteNote ,deletepermanent} from "../../../Services/NoteServices";
import Notefirst from "../NoteFirst/Notefirst";

function NoteThird({ obj, getNotes }) {

  const archivechange = async () => {
    let archivedata = {
      noteIdList: [obj.id],
      isArchived: true
    };
    let res = await archiveNote(archivedata);
    // console.log(res);
    getNotes();
  };

  const deleteChange = async () => {
    // console.log(obj.id);
    let deletedata = {
      noteIdList: [obj.id],
      isDeleted: true
    };

    let parmanentDeletedata={
      noteIdList: [obj.id],
    }
    if(obj.isDeleted)
    {
      let res=await deletepermanent(parmanentDeletedata);
      console.log('deleted Permanently...');
      getNotes();
    }
    else{
      let res = await deleteNote(deletedata);
      console.log('Note Trash Sucessfully...');
      getNotes();
    }
  };

  return (
    <div className="thirdnoteparent">
      <div className="thirdnotecontainer">
        <Paper elevation={5} style={{ backgroundColor: obj.color }}>
          <div className="thirdnoteTitle">
            {/* <TextField
          id="standard-basic2"
          placeholder="Title"
          variant="standard"
          fullWidth
          InputProps={{
            disableUnderline: true
          }}
        /> */}
            {obj.title}
          </div>

          <div style={{ backgroundColor: obj.color,paddingLeft:'10px' }}> {obj.description}</div>
          {/* <TextareaAutosize
        id="thirdnotedetails"
        placeholder="Take a Note..."
      /> */}

          <div className="thirdnotepersonal">
            <Typography>
              <IconButton>
                <AddAlertOutlinedIcon />
              </IconButton>

              <IconButton>
                <PersonAddAlt1OutlinedIcon />
              </IconButton>

              <IconButton>
                {/* <ColorLensOutlinedIcon/> */}
                <ColorPopper action={"update"} obj={obj} />
              </IconButton>

              <IconButton>
                <ImageOutlinedIcon />
              </IconButton>

              <IconButton onClick={archivechange}>
                <ArchiveOutlinedIcon />
              </IconButton>

              <IconButton onClick={deleteChange}>
                <DeleteOutlineIcon />
              </IconButton>
            </Typography>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default NoteThird;
