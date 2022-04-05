const initialState = {
  countrieIp: 'IN',
};

const useIpApi = (state = initialState, action) => {
  switch (action.type) {
    case 'IP':
      return {
        ...state,
        countrieIp: action.payload,
      };
    default:
      return state;
  }
};

export default useIpApi;
