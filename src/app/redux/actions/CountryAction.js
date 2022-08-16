export const CREATE_COUNTRY = "CREATE_COUNTRY";
export const EDIT_COUNTRY = "EDIT_COUNTRY";
export const DELETE_COUNTRY = "DELETE_COUNTRY";

export const CreateCountry1 = (data) => (dispatch) => {
  dispatch({
    type: CREATE_COUNTRY,
    payload: data,
  });
};

export const EditCountry1 = (data) => (dispatch) => {
  dispatch({
    type: EDIT_COUNTRY,
    payload: data,
  });
};

export const DeleteCountry = (data) => (dispatch) => {
  dispatch({
    type: DELETE_COUNTRY,
    payload: data,
  });
};