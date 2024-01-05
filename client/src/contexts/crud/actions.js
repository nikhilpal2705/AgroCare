import * as actionTypes from './types';

const contextActions = (dispatch) => {
  return {
    modal: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_MODAL });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_MODAL });
      },
    },
    addBox: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_ADD_BOX });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_ADD_BOX });
      }
    },
    editBox: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_EDIT_BOX });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_EDIT_BOX });
      },
    },
    panel: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_PANEL });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_PANEL });
      }
    },
    readBox: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_READ_BOX });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_READ_BOX });
      }
    },
  };
};

export default contextActions;
