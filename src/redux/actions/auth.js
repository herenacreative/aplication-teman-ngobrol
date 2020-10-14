import axios from 'axios';
import API from '../../config/API';

export const login = data => {
    return {
      type: 'LOGIN',
      payload: axios({
        method: 'POST',
        url: `${API.baseURL}/auth/login`,
        data: data,
      }),
    };
}

export const register = data => {
  return {
    type: 'REGISTER',
    payload: axios({
      method: 'POST',
      url: `${API.baseURL}/auth/register`,
      data: data,
    }),
  };
}

export const logout = () => {
  return {
    type: "LOGOUT_FULFILLED"
  };
};