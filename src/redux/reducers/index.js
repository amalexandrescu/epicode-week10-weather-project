export const ADD_TO_SAVED_PLACES = "ADD_TO_SAVED_PLACES";

const initialState = {
  favorites: {
    places: [], // we're going to put our favourite places here!
  },
};

const mainReducer = (state = initialState, action) => {
  const newFunct = (payload) => {
    let includes = false;
    for (let i = 0; i < state.favorites.places.length; i++) {
      if (state.favorites.places[i].id === payload.id) {
        includes = true;
        break;
      }
    }
    return includes;
  };

  if (action.type === ADD_TO_SAVED_PLACES && newFunct(action.payload))
    return state;
  // the goal of the reducer function is ALWAYS to RETURN the NEW STATE
  // of the application
  switch (action.type) {
    // multiple cases are going to be happening here, with time!
    // but now, just for starting, let's write just the default
    // so we can conclude this function and finish our store/index.js

    case ADD_TO_SAVED_PLACES:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          places: [...state.favorites.places, action.payload],
        },
      };

    case "REMOVE":
      return {
        ...state,
        favorites: {
          ...state.favorites,
          places: state.favorites.places.filter((place) => {
            if (place.id !== action.payload) return place;
          }),
        },
      };

    case "REMOVE_FROM_SAVED_PLACES":
      return {
        ...state,
        favorites: {
          ...state.favorites,
          places: state.favorites.places.filter((place, index) => {
            if (index !== action.payload) return place;
          }),
        },
      };

    // things you can use: spread operator, slice, filter, concat etc.
    // things you CANNOT use: push, splice, etc.

    default:
      return state;
  }
};

export default mainReducer;
