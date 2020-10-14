const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'MESSAGE_ALL_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'MESSAGE_ALL_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case 'MESSAGE_ALL_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data[0],
      };
    case 'MESSAGE_PERSONAL_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'MESSAGE_PERSONAL_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case 'MESSAGE_PERSONAL_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data[0],
      };
    case 'MESSAGE_SEND_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'MESSAGE_SEND_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case 'MESSAGE_SEND_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data[0],
      };
    default:
      return state;
  }
};

export default auth;
