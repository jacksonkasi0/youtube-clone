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

export const setMic = (bool) => {
  return {
    type: 'MIC_STATE',
    payload: bool,
  };
};

export const setSearchText = (text)=>{
  return {
    type: "SEARCH_BOX_TEXT",
    payload:text
  }
}