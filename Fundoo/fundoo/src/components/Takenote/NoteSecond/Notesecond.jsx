import React, { useState } from "react";
import {
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import "../NoteSecond/Notesecond.css";
import { TextareaAutosize } from "@mui/base";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import ColorPopper from "../popper/ColorPopper";
import { createNoteService, getAllNotes } from "../../../Services/NoteServices";
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';

function Notesecond() {
  
  const [addNotes, setNotes] = useState({
    title: " ",
    description: " ",
    isArchived: false,
    color: " ",
  });

  const createNote = async () => {
    
    let response = await createNoteService(addNotes);
    console.log(response);
  };

  const handleCreatedNote = (event) => {
    setNotes({ ...addNotes, [event.target.name]: event.target.value });
  };

return (
    <div className="containerone">
      <Paper elevation={5} className="paper" style={{backgroundColor:addNotes.color}}>
        <div className="title">
          <TextField
            id="standard-basic1"
            placeholder="title"
            variant="standard"
            onChange={handleCreatedNote}
            name="title"
            fullWidth
            InputProps={{
              disableUnderline: true,

              endAdornment: (
                <InputAdornment>
                  <PushPinOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <TextareaAutosize
          id="details"
          placeholder="Take a Note..."
          onChange={handleCreatedNote}
          name="description"
          style={{backgroundColor:addNotes.color}}
        />

        <div className="personal">
          <Typography>
            <IconButton>
              <AddAlertOutlinedIcon />
            </IconButton>

            <IconButton>
              <PersonAddAlt1OutlinedIcon />
            </IconButton>

            <IconButton>
              <ColorPopper setNotes={setNotes} addNotes={addNotes} action={"create"} />
            </IconButton>

            <IconButton>
              <ImageOutlinedIcon />
            </IconButton>
            {addNotes.isArchived ? (
              <IconButton>
                <UnarchiveOutlinedIcon
                  onClick={() => setNotes({ ...addNotes, isArchived: false })}
                />
              </IconButton>
            ) : (
              <IconButton>
                <ArchiveOutlinedIcon
                  onClick={() => setNotes({ ...addNotes, isArchived: true })}
                />
              </IconButton>
            )}

            <IconButton>
              <MoreVertOutlinedIcon />
            </IconButton>

            <IconButton>
              <UndoOutlinedIcon />
            </IconButton>

            <IconButton>
              <RedoOutlinedIcon />
            </IconButton>
          </Typography>
          <Typography className="closebutton">
            <button onClick={createNote}>Close</button>
          </Typography>
        </div>
      </Paper>
    </div>
  );
}

export default Notesecond;
