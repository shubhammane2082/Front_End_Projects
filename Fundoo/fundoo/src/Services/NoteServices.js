import axios from "axios";
function getHeaders() {
  return {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
}
export const getAllNotes = async () => {
  let response = await axios.get(
    "https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList",
    getHeaders()
  );
  // console.log(response);
  return response;
};

export const createNoteService = async (addNotes) => {
  let response = await axios.post(
  "https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes", addNotes, getHeaders());
  return response;
};

export const archiveNote = async (archivedata) => {
  let response = await axios.post(
  "https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",archivedata,getHeaders());
  return response;
};

export const deleteNote = async (deletedata) => {
  let response = await axios.post(
    "https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes",deletedata,
    getHeaders()
  );
  // console.log(response);
  return response;
};

export const deletepermanent = async (parmanentDeletedata) => {
  let response = await axios.post(
    "https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes",parmanentDeletedata,
    getHeaders()
  );
  // console.log(response);
  return response;
};


export const Notescolor = async ( colordata) => {
  let response = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",colordata
      , getHeaders());

  // console.log(response);
  return response;
}


