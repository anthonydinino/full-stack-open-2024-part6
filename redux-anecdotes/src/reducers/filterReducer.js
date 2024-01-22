const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER":
      return action.payload;

    default:
      return state;
  }
};

export const setFilter = (text) => {
  return {
    type: "SET_FILTER",
    payload: text,
  };
};

export default filterReducer;
