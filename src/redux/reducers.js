import cultivateMessages from "../utils/cultivateMessages";
export const LOGIN_REQUEST = 'login/request';
export const LOGIN_SUCCESS = 'login/success';
export const LOGIN_FAILURE = 'login/failure';
export const CLEAR_LOGIN_ERROR = 'login/clear-error';
export const LOGOUT_REQUEST = 'logout/request';
export const LOGOUT_COMPLETE = 'logout/complete';
export const MESSAGES_GET_REQUEST = 'messages/get/request';
export const MESSAGES_GET_SUCCESS = 'messages/get/success'
export const MESSAGES_GET_FAILURE = 'messages/get/failure'
export const MESSAGE_SEND_REQUEST = 'messages/post/request';
export const MESSAGE_SEND_SUCCESS = 'messages/post/success';
export const MESSAGE_SEND_FAILURE = 'messages/post/failure';
export const FETCHING_TOGGLE = 'messages/fetching-toggle';
export const STATUS_REQUEST = 'status/request';
export const STATUS_COMPLETE = 'status/complete';
export const ADD_LOG_RECORD = 'log/add';
export const CLEAN_LOG_LIST = 'log/clean';

const initialState = {
    userName: null,
    userToken: null,
    language: 'en',
    messages: [],
    server: {
        status: true,
        currentUserCount: 0,
    },
    requestStatuses: {
        isActiveLoginRequest: false,
        errorLoginRequest: null,
        isActiveLogoutRequest: false,
        isActiveGetMessageRequest: false,
        isActiveSendMessageRequest: false,
        isActiveStatusRequest: false,
    },
    messageFetchingEnabled: true,
    appLog: [],
};

export default (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case LOGIN_REQUEST:
            return { ...state, requestStatuses: { ...state.requestStatuses, isActiveLoginRequest: true, errorLoginRequest: null } };
        case LOGIN_SUCCESS:
            const { userName, userToken } = payload;
            return { ...state, userName, userToken, requestStatuses: { ...state.requestStatuses, isActiveLoginRequest: false } };
        case LOGIN_FAILURE:
            const { errorLoginRequest } = payload;
            return { ...state, requestStatuses: { ...state.requestStatuses, isActiveLoginRequest: false, errorLoginRequest }};
        case LOGOUT_REQUEST:
            return { ...state, requestStatuses: { ...state.requestStatuses, isActiveLogoutRequest: true } };
        case LOGOUT_COMPLETE:
            return { ...state, messages: [], userName: null, userToken: null, requestStatuses: { ...state.requestStatuses, isActiveLogoutRequest: false } };
        case STATUS_REQUEST:
            return { ...state, requestStatuses: { ...state.requestStatuses, isActiveStatusRequest: true } };
        case STATUS_COMPLETE:
            return { ...state, requestStatuses: { ...state.requestStatuses, isActiveStatusRequest: false } };
        case CLEAR_LOGIN_ERROR:
            return { ...state, requestStatuses: { ...state.requestStatuses, errorLoginRequest: null } };
        case MESSAGES_GET_REQUEST:
            return { ...state, requestStatuses: { ...state.requestStatuses, isActiveGetMessageRequest: true } };
        case MESSAGES_GET_SUCCESS:
            const { messages } = payload;
            return { ...state, messages: cultivateMessages(state.messages, messages, state.userName), requestStatuses: { ...state.requestStatuses, isActiveGetMessageRequest: false } };
        case MESSAGES_GET_FAILURE:
            return { ...state, requestStatuses: { ...state.requestStatuses, isActiveGetMessageRequest: false } };
        case MESSAGE_SEND_REQUEST:
            return { ...state, requestStatuses: { ...state.requestStatuses, isActiveSendMessageRequest: true } };
        case MESSAGE_SEND_SUCCESS:
            const { message } = payload;
            return { ...state, messages: cultivateMessages(state.messages, [message], state.userName), requestStatuses: { ...state.requestStatuses, isActiveSendMessageRequest: false } };
        case MESSAGE_SEND_FAILURE:
            return { ...state, requestStatuses: { ...state.requestStatuses, isActiveSendMessageRequest: false } };
        case FETCHING_TOGGLE:
            return { ...state, messageFetchingEnabled: !state.messageFetchingEnabled };
        case ADD_LOG_RECORD:
            const { record } = payload;
            return { ...state, appLog: [ ...state.appLog, record ] };
        case CLEAN_LOG_LIST:
            return { ...state, appLog: [] };
        default:
            return state;
    }
}

