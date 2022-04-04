import React, { useState } from 'react';
import Style from './SearchBox.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Autocomplete, TextField, Fade } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useDispatch } from 'react-redux';

const SearchBox = ({ visible, screenWidth, setSearchText, searchBoxText }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let trimedWord = searchBoxText.trim();

  const [suggestion, setSuggestion] = useState([]);

  const searchFunc = () => {
    if (trimedWord !== '' && trimedWord !== null) {
      navigate(`search/${trimedWord}`);
    }
  };

  return (
    <Fade
      in={screenWidth > 899 ? true : visible === 'none' ? false : true}
      style={{ transitionDuration: '300ms' }}
    >
      <Box
        sx={{ display: { xs: visible, md: 'flex' } }}
        className={
          screenWidth > 899
            ? Style.searchContainer
            : Style.bottomSearchConatiner
        }
      >
        <Autocomplete
          className={
            screenWidth > 899 ? Style.searchBox : Style.bottomSearchBox
          }
          // value={searchBoxText}
          inputValue={searchBoxText}
          options={suggestion}
          // getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                {...params}
                sx={{
                  mt: '-2px',
                  outline: 'none',
                }}
                placeholder='Search'
                onChange={(e) => {
                  dispatch(setSearchText(e.target.value));
                }}
                onKeyUp={(e) => (e.code === 'Enter' ? searchFunc() : null)}
              />
              <Link to={`/search/${trimedWord}`}>
                <Button className={Style.searchBtn}>
                  <SearchRoundedIcon size='large' />
                </Button>
              </Link>
            </Box>
          )}
        />
      </Box>
    </Fade>
  );
};

export default SearchBox;
