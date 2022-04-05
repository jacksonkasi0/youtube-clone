const initialState = {
  sidebarIcon: 'Home',
  sidebarView: false,
  screenWidth: window.innerWidth,
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
    default:
      return state;
  }
};

export default setUtilities;
