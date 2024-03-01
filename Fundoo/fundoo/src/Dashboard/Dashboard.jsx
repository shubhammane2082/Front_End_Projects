import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/Header/Header";
import MiniDrawer from "../components/SideNav/Sidenav";
import Notesecond from "../components/Takenote/NoteSecond/Notesecond";
import Notefirst from "../components/Takenote/NoteFirst/Notefirst";
import NoteThird from "../components/Takenote/Notethird/Notethird";
import { getAllNotes} from "../Services/NoteServices";
import Sidebar from "../components/SideNav/Sidenav";

function Dashboard() {
  const [toggle, setoggle] = useState(false);

  const toggledata = () => {
    setoggle((previousState) => !previousState);
  };

  const [AllNotes, SetAllNotes] = useState([]);
  const [typesOfNote, setTypeOfNote] = useState("Notes");

  const getNotes = async () => {
    console.log(typesOfNote);

    let response = await getAllNotes();
    let arr = response.data.data.data;
    // console.log(arr);

    if (typesOfNote === "Notes") {
      let newArr = arr.filter((note) => note.isArchived === note.isDeleted);
      SetAllNotes(newArr);
    }

    else if (typesOfNote === "Archive") 
    {
      let newArr = arr.filter(
        (note) => note.isArchived === true && note.isDeleted === false
      );
      SetAllNotes(newArr);
    } 
    else if (typesOfNote === "Trash")
    {
      let newArr = arr.filter(
        (note) => note.isArchived === false && note.isDeleted === true
      );
      SetAllNotes(newArr);
    }
    // console.log(arr);
  };
  useEffect(() => {
    getNotes();
  }, [typesOfNote]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100vw"
      }}
    >
      
      <PrimarySearchAppBar />
      <Sidebar setTypeOfNote={setTypeOfNote} />
      
      <div>
        {toggle ? (
          <Notesecond toggledata={toggledata}/>
        ) : (
          <Notefirst toggledata={toggledata} />
        )}
      </div>

      <div
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "6px",
          padding: "10px",
        }}
      >
        {AllNotes.map((obj) => (
          <NoteThird obj={obj} getNotes={getNotes} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
