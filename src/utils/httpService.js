import axios from 'axios';
import { API_URL } from '@env';

const STATUS_URL = `${API_URL}/v1/status`;
const SIGN_IN_URL = `${API_URL}/v1/signin`;
const SIGN_OUT_URL = `${API_URL}/v1/signout`;
const MESSAGES_URL = `${API_URL}/v1/messages`;

const prepareErrResult = (err) => {
  return ({
    errorMessage: err.response?.data?.message || 'Request error', errorCode: err.response?.status || 0
  });
};

export const requestUserAuth = async (userName) => {
  try {
    const { data } = await axios.post(SIGN_IN_URL, { name: userName });
    return data;
  } catch (err) {
    return prepareErrResult(err)
  }
}

export const requestUserLogout = async (userName, userToken) => {
  try {
    const { data } = await axios.post(SIGN_OUT_URL, { name: userName, token: userToken });
    return data;
  } catch (err) {
    return prepareErrResult(err)
  }
}

export const requestGetMessages = async (userToken, afterMessageId) => {
  try {
    const { data } = await axios.get(MESSAGES_URL, { params: { token: userToken, after: afterMessageId } });
    return { messages: data };
  } catch (err) {
    return prepareErrResult(err)
  }
}

export const requestSendMessage = async (userToken, message) => {
  try {
    const { data } = await axios.post(MESSAGES_URL, { message, token: userToken } );
    return { messageInfo: data };
  } catch (err) {
    return prepareErrResult(err)
  }
}

export const requestStatus = async (userToken) => {
  try {
    const { data } = await axios.get(STATUS_URL, { params: { token: userToken } });
    return data;
  } catch (err) {
    return prepareErrResult(err)
  }
}

