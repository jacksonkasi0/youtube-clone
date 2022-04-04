const initialState = {
  sidebarIcon: 'Home',
  sidebarView: false,
  screenWidth: window.innerWidth,
  micSate: false,
  searchBoxText: '',
};

const setUtilities = (state = initialState, action) => {
  switch (action.type) {
    case 'ICON_COLOR':
      return {
        ...state,
        sidebarIcon: action.payload,
      };
    case 'CHANGE_SIDEBAR':
      return {
        ...state,
        sidebarView: action.payload,
      };
    case 'SCREEN_WIDTH':
      return {
        ...state,
        screenWidth: action.payload,
      };
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
    default:
      return state;
  }
};

export default setUtilities;
