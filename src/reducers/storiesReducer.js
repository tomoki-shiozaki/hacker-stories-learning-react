const storiesReducer = (state, action) => {
  switch (action.type) {
    case "SET_STORIES":
      return action.payload;
    case "REMOVE_STORY":
      return state.filter(
        (story) => story.objectID !== action.payload.objectID
      );
    default:
      throw new Error();
  }
};

export default storiesReducer;
