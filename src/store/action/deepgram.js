export const setMic = (bool) => {
  return {
    type: 'MIC_STATE',
    payload: bool,
  };
};

export const setSearchText = (text) => {
  return {
    type: 'SEARCH_BOX_TEXT',
    payload: text,
  };
};

export const setSubtitle = (text) => {
  return {
    type: 'SUBTILTLE',
    payload: text,
  };
};

export const subtitleState = (bool) => {
  return {
    type: 'SUBTILTLE_STATE',
    payload: bool,
  };
};
