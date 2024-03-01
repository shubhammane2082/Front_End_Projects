import axios from "axios";

export const signin = async (obj) => {
  let response = await axios.post(
    "https://fundoonotes.incubation.bridgelabz.com/api/user/login",
    obj
  );
  // console.log(response);
  return response;
};

export const signup = async (obj) => {
    let response = await axios.post(
      "https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp",
      obj
    );
    console.log(response);
    return response;
  };