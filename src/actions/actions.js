import axios from "axios";
const ADD = "ADD";
const DELETE = "DELETE";
const EDIT = "EDIT";
export const addMessage = message => {
  return {
    type: ADD,
    message: message
  };
};
export const editMessage = (index, item) => {
  return {
    type: EDIT,
    index: index,
    item: item
  };
};
export const deleteMessage = index => {
  return {
    type: DELETE,
    index: index
  };
};

export const postRequest = message => {
  return dispatch => {
    return axios
      .post("https://express-todo-persist.glitch.me/add", { message })
      .then(res => {});
  };
};

export const getRequest = () => {
  return dispatch => {
    return axios.get("https://express-todo-persist.glitch.me/get").then(res => {
      res.data.map(info => {
        // console.log(info.message, "Mess");
        console.log(info.message, "info");
        dispatch(addMessage(info.message));
      });
    });
  };
};

export const getDelete = (index, message) => {
  return dispatch => {
    console.log(index, message, " gD");
    return axios
      .delete("https://express-todo-persist.glitch.me/delete", {
        data: { message: message }
      })
      .then(res => {
        console.log(res, "  DG RES");
        dispatch(deleteMessage(index));
      });
  };
};
