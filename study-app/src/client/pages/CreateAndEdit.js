import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../styles/editPage.css";
import { Link, useNavigate   } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CreateAndEdit() {
  const navigate = useNavigate ();
  const [sets, setSets] = useState([]);
  const [setIds, setSetIds] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedValue(newValue);
    if (newValue) {
      const selectedSetId = setIds[sets.indexOf(newValue)];
      navigate(`/study/?name=${newValue}&setId=${selectedSetId}`);
    }
  };

  const getCardsFromDatabase = () => {
    Axios.get(`http://localhost:3001/getUserSets/${localStorage.getItem('id')}`)
      .then((response) => {
        if (response != null) {
          const responseData = response.data;
          const setNames = responseData.map((data) => data.setName);
          const setId = responseData.map((data) => data.setId);
          setSets(setNames);
          setSetIds(setId);
        }
      });
  };

  useEffect(() => {
    if(localStorage.getItem('loginState') == 1){
      getCardsFromDatabase();
    } 
  }, []);

  return (
    <>
    <Autocomplete
      className="dropdownMenu"
        disablePortal
        id="combo-box-demo"
        options={sets}
        sx={{ width: 300 }}
        value={selectedValue}
        onChange={handleAutocompleteChange}
      renderInput={(params) => <TextField {...params} label="Your Sets" />}
    />
    </>
  );
}