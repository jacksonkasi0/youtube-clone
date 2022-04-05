export const changeIconColor = (iconName) => {
  return {
    type: 'ICON_COLOR',
    payload: iconName,
  };
};

export const changeSidebar = (bool) => {
  return {
    type: 'CHANGE_SIDEBAR',
    payload: bool, //Boolean
  };
};

export const setScreenWidth = (val) => {
  return {
    type: 'SCREEN_WIDTH',
    payload: val,
  };
};
