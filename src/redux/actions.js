import { format } from 'date-fns';
import {
    requestGetMessages,
    requestSendMessage,
    requestStatus,
    requestUserAuth,
    requestUserLogout,
} from '../utils/httpService';
import {
    ADD_LOG_RECORD,
    CLEAN_LOG_LIST,
    CLEAR_LOGIN_ERROR,
    FETCHING_TOGGLE,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_COMPLETE,
    LOGOUT_REQUEST,
    MESSAGE_SEND_FAILURE,
    MESSAGE_SEND_REQUEST,
    MESSAGE_SEND_SUCCESS,
    MESSAGES_GET_FAILURE,
    MESSAGES_GET_REQUEST,
    MESSAGES_GET_SUCCESS,
    STATUS_COMPLETE,
    STATUS_REQUEST,
} from './reducers';

export const authUserAction = (userName) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    const { token, userId, errorMessage, errorCode } = await requestUserAuth(userName);
    if (errorMessage || errorCode) {
        dispatch({ type: LOGIN_FAILURE, payload: { errorLoginRequest: `${errorCode}: ${errorMessage}` } });
    }
    else {
        dispatch({ type: LOGIN_SUCCESS, payload: { userName: userName, userToken: token } });
    }
}

export const setUserDataAction = (userName, userToken) => async (dispatch) => {
    dispatch({ type: STATUS_REQUEST });
    const { errorCode } = await requestStatus(userToken);
    dispatch({ type: STATUS_COMPLETE });
    if (errorCode) {
        return false;
    }
    dispatch({ type: LOGIN_SUCCESS, payload: { userName, userToken } });
    return true;
}

export const logoutUserAction = () => async (dispatch, getState) => {
    const { userName, userToken } = getState();
    dispatch({ type: LOGOUT_REQUEST });
    await requestUserLogout(userName, userToken);
    dispatch({ type: LOGOUT_COMPLETE });
}

export const fetchMessagesAction = () => async (dispatch, getState) => {
    const ts = format(new Date(), 'mm:ss');

    if (getState().userToken && !getState().requestStatuses.isActiveGetMessageRequest && getState().messageFetchingEnabled) {

        console.log(ts, ': 🤎 Reducer run fetch');

        dispatch({ type: MESSAGES_GET_REQUEST });

        const { messages, errorMessage, errorCode  } = await requestGetMessages(getState().userToken, "");

        if (errorMessage || errorCode) {
            dispatch({ type: MESSAGES_GET_FAILURE, payload: { } });
        }
        else {
            dispatch({ type: MESSAGES_GET_SUCCESS, payload: { messages } });
        }
    }
    else {
        console.log(ts, ': 💔 Reducer skip fetch');
    }
}

export const sendMessageAction = (message) => async (dispatch, getState) => {
    dispatch({ type: MESSAGE_SEND_REQUEST });
    const { messageInfo, errorMessage, errorCode  } = await requestSendMessage(getState().userToken, message);
    if (errorMessage || errorCode) {
        dispatch({ type: MESSAGE_SEND_FAILURE });
        return false;
    }
    else {
        dispatch({ type: MESSAGE_SEND_SUCCESS, payload: { message: { ...messageInfo, message, userName: getState().userName } } });
        return true;
    }
}

export const clearLoginErrorAction = () => (dispatch) => dispatch({ type: CLEAR_LOGIN_ERROR });

export const toggleMessageFetching = () => (dispatch) => dispatch({ type: FETCHING_TOGGLE });

export const cleanLogAction = () => (dispatch) => dispatch({ type: CLEAN_LOG_LIST });

export const addLogRecordAction = (logRecord) => async (dispatch) => {
    dispatch({ type: ADD_LOG_RECORD, payload: { record: logRecord  } });
}
