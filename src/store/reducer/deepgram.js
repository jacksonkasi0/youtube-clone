const initialState = {
  micSate: false,
  searchBoxText: '',
  subtitleText: '',
  subState: false,
};

const useDeepgram = (state = initialState, action) => {
  switch (action.type) {
    case 'MIC_STATE':
      return {
        ...state,
        micSate: action.payload,
      };
    case 'SEARCH_BOX_TEXT':
      return {
        ...state,
        searchBoxText: action.payload,
      };
    case 'SUBTILTLE':
      return {
        ...state,
        subtitleText: action.payload,
      };
    case 'SUBTILTLE_STATE':
      return {
        ...state,
        subState: action.payload,
      };
    default:
      return state;
  }
};

export default useDeepgram;
