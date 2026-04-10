import * as actionTypes from './types';

export const initialState = {
  isModalOpen: false,
  isPanelClose: true,
  isReadBoxOpen: false,
  isEditBoxOpen: false,
  isAddBoxOpen: false,
};

export function contextReducer(state, action) {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };

    case actionTypes.OPEN_PANEL:
      return {
        ...state,
        isPanelClose: false,
      };
    case actionTypes.CLOSE_PANEL:
      return {
        ...state,
        isPanelClose: true,
      };
      case actionTypes.OPEN_ADD_BOX:
        return {
          ...state,
          isAddBoxOpen: true,
          isEditBoxOpen: false,
          isReadBoxOpen: false,
        };
      case actionTypes.CLOSE_ADD_BOX:
        return {
          ...state,
          isAddBoxOpen: false,
          isEditBoxOpen: false,
          isReadBoxOpen: false,
        };
    case actionTypes.OPEN_READ_BOX:
      return {
        ...state,
        isAddBoxOpen: false,
        isEditBoxOpen: false,
        isReadBoxOpen: true,
      };
    case actionTypes.CLOSE_READ_BOX:
      return {
        ...state,
        isAddBoxOpen: false,
        isEditBoxOpen: false,
        isReadBoxOpen: false,
      };
    case actionTypes.OPEN_EDIT_BOX:
      return {
        ...state,
        isAddBoxOpen: false,
        isEditBoxOpen: true,
        isReadBoxOpen: false,
      };
    case actionTypes.CLOSE_EDIT_BOX:
      return {
        ...state,
        isAddBoxOpen: false,
        isEditBoxOpen: false,
        isReadBoxOpen: false,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
