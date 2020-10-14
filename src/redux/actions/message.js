import axios from 'axios';
import API from '../../config/API';

export const get_message_all = (id, result) => {
    return {
      type: 'MESSAGE_ALL',
      payload: axios({
        method: 'GET',
        url: `${API.baseURL}/messages/${id}`,
        headers: {
          Authorization: result,
        },
      }),
    };
}

export const get_message_personal = (sender_id, receiver_id, result) => {
  return {
    type: 'MESSAGE_PERSONAL',
    payload: axios({
      method: 'GET',
      url: `${API.baseURL}/messages/${sender_id}/${receiver_id}`,
      headers: {
        Authorization: result,
      },
    }),
  };
};

export const post_message = (data, result) => {
  return {
    type: 'MESSAGE_SEND',
    payload: axios({
      method: 'POST',
      url: `${API.baseURL}/messages`,
      data: data,
      headers: {
        Authorization: result,
      },
    }),
  };
};
