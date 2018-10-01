export default (state = [], action) => {
  let newArr = [...state];

  switch (action.type) {
    case "ADD":
      console.log(action.message, " reducer add");
      return [...state, action.message];
    case "DELETE":
      let idx = action.index;

      let result = newArr.filter(i => i !== newArr[idx]);

      return result;
    case "EDIT":
      newArr[action.index] = action.item;
      return newArr;

    default:
      return state;
  }
};
