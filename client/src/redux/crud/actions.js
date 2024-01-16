import * as actionTypes from './types';
import api from 'api/api';
import Cookies from 'js-cookie';
const params = { userId: parseInt(Cookies.get('userId')) }

export const crud = {
  resetState:
    (props = {}) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.RESET_STATE,
        });
      },
  resetAction:
    ({ actionType }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.RESET_ACTION,
          keyState: actionType,
          payload: null,
        });
      },
  currentItem:
    ({ data }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.CURRENT_ITEM,
          payload: { ...data },
        });
      },
  currentAction:
    ({ actionType, data }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.CURRENT_ACTION,
          keyState: actionType,
          payload: { ...data },
        });
      },
  list:
    ({ entity, options = { page: 1, items: 10 } }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.REQUEST_LOADING,
          keyState: 'list',
          payload: null,
        });

        let data = await api.list({ entity, options, params });
        console.log(`🙈 🙉 🙊 ~ data : `, data)

        if (data.success === true) {
          const result = {
            items: data.result,
          };
          dispatch({
            type: actionTypes.REQUEST_SUCCESS,
            keyState: 'list',
            payload: result,
          });
        } else {
          dispatch({
            type: actionTypes.REQUEST_FAILED,
            keyState: 'list',
            payload: null,
          });
        }
      },
  create:
    ({ entity, jsonData, withUpload = false }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.REQUEST_LOADING,
          keyState: 'create',
          payload: null,
        });
        let data = null;
        if (withUpload) {
          // data = await api.createAndUpload({ entity, jsonData });
        } else {
          data = await api.create({ entity, jsonData: { ...jsonData, ...params } });
        }

        if (data.success === true) {
          dispatch({
            type: actionTypes.REQUEST_SUCCESS,
            keyState: 'create',
            payload: data.result,
          });

          dispatch({
            type: actionTypes.CURRENT_ITEM,
            payload: data.result,
          });
        } else {
          dispatch({
            type: actionTypes.REQUEST_FAILED,
            keyState: 'create',
            payload: null,
          });
        }
      },
  read:
    ({ entity, id }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.REQUEST_LOADING,
          keyState: 'read',
          payload: null,
        });

        let data = await api.read({ entity, id, params });

        if (data.success === true) {
          dispatch({
            type: actionTypes.CURRENT_ITEM,
            payload: data.result,
          });
          dispatch({
            type: actionTypes.REQUEST_SUCCESS,
            keyState: 'read',
            payload: data.result,
          });
        } else {
          dispatch({
            type: actionTypes.REQUEST_FAILED,
            keyState: 'read',
            payload: null,
          });
        }
      },
  update:
    ({ entity, id, jsonData, withUpload = false }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.REQUEST_LOADING,
          keyState: 'update',
          payload: null,
        });

        let data = null;

        if (withUpload) {
          // data = await api.updateAndUpload({ entity, id, jsonData });
        } else {
          data = await api.update({ entity, id, jsonData: { ...jsonData, ...params } });
        }

        if (data.success === true) {
          dispatch({
            type: actionTypes.REQUEST_SUCCESS,
            keyState: 'update',
            payload: data.result,
          });
          dispatch({
            type: actionTypes.CURRENT_ITEM,
            payload: data.result,
          });
        } else {
          dispatch({
            type: actionTypes.REQUEST_FAILED,
            keyState: 'update',
            payload: null,
          });
        }
      },

  delete:
    ({ entity, id }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.REQUEST_LOADING,
          keyState: 'delete',
          payload: null,
        });

        let data = await api.delete({ entity, id, params });

        if (data.success === true) {
          dispatch({
            type: actionTypes.REQUEST_SUCCESS,
            keyState: 'delete',
            payload: data.result,
          });
          dispatch({
            type: actionTypes.CURRENT_ITEM,
            payload: data.result,
          });
        } else {
          dispatch({
            type: actionTypes.REQUEST_FAILED,
            keyState: 'delete',
            payload: null,
          });
        }
      },
};
