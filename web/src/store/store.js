const initialState = {
  breeds: [],
  popularBreeds: [],
  error: null,
  showModal: false,
};

const reducer = (state = initialState, action) => {
  console.log("action", action);
  switch (action.type) {
    case "SET_BREEDS":
      return { ...state, breeds: action.payload };
    case "SET_POPULAR_BREEDS":
      return { ...state, popularBreeds: action.payload };
    case "SET_SHOW_MODAL":
      return { ...state, showModal: action.payload };
    default:
      return state;
  }
};

export default reducer;
