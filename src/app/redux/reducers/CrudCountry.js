import {
  CREATE_COUNTRY,
  EDIT_COUNTRY,
  DELETE_COUNTRY,
} from "../actions/CountryAction";

const initialState = [];

const CountryReducer = function (state = initialState, action) {
  switch (action.type) {
    case CREATE_COUNTRY: {
      return [action.payload];
    }
    case EDIT_COUNTRY: {
      return [action.payload];
    }
    case DELETE_COUNTRY: {
      return [action.payload];
    }
    default: {
      return [...state];
    }
  }
};

export default CountryReducer;
