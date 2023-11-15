import React, { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import '../styles/home.css';
import leftArrow from '../left.png';
import rightArrow from '../right.png';

export default function Home() {
  const [question, setQuestion] = useState(' ');
  const [answer, setAnswer] = useState(' ');
  let [cardText, setText] = useState('No Cards Yet! Add a card to begin!');
  let [cardAnswer, setAnswerText] = useState('No Cards Yet! Add a card to begin!');
  let [flashCards, setFlashCards] = useState([]);
  const [flip, setFlip] = useState(0);
  let tempVar = useRef('');
  let index = useRef(-1);
  const [sets, setSets] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  const updateNewCardText = () => {
    setText(flashCards[index.current].question);
    setAnswerText(flashCards[index.current].answer);
  };

  const updateText = () => {
    if (cardText === flashCards[index.current].question) {
      setText(flashCards[index.current].answer);
    } else {
      setText(flashCards[index.current].question);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('loginState') === '1') {
      getCardsForDropDown();
    }
  }, []);

  useEffect(() => {
    // When the flashCards state changes, update the displayed text
    if (flashCards.length > 0) {
      index.current = 0;
      updateNewCardText();
    }
  }, [flashCards]);

  const handleLeftClick = (type) => {
    if (index.current === 0) {
      return;
    } else {
      index.current = index.current - 1;
      updateNewCardText();
    }
  };

  const getCardsForDropDown = () => {
    Axios.get(`http://localhost:3001/getUserSets/${localStorage.getItem('id')}`)
      .then((response) => {
        if (response != null) {
          const responseData = response.data;
          const setsData = responseData.map((data) => ({
            id: data.setId,
            name: data.setName,
          }));
          setSets(setsData);
        }
      });
  };

  const handleRightClick = (type) => {
    if (flashCards[index.current + 1] == null) {
      return;
    } else {
      index.current = index.current + 1;
      updateNewCardText();
    }
  };

  function handleCardClick() {
    if (cardText === flashCards[index.current].question) {
      tempVar.current = flashCards[index.current].answer;
    } else {
      tempVar.current = flashCards[index.current].question;
    }
    updateText();
    setFlip(1);
    setText('');
  }

  function hideOrShowArrows() {
    let lArrow = document.getElementById('arrowLeft');
    let rArrow = document.getElementById('arrowRight');
    if (lArrow.style.visibility === 'hidden') {
      lArrow.style.visibility = 'visible';
      rArrow.style.visibility = 'visible';
    } else {
      lArrow.style.visibility = 'hidden';
      rArrow.style.visibility = 'hidden';
    }
  }

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedValue(newValue);
    if (newValue !== null) {
      const setId = newValue.id;
      getCardsFromDatabase(setId);
    }
  };

  const getCardsFromDatabase = (setId) => {
    Axios.get(`http://localhost:3001/cards/${localStorage.getItem('id')}/${setId}`)
      .then((response) => {
        if (response != null) {
          let data = response.data[0];
          data = data['cards'];
          setFlashCards(JSON.parse(data));
        }
      });
  };

  return (
    <>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
      </style>
      <br />
      <Autocomplete
        className="dropdownMenu"
        disablePortal
        id="combo-box-demo"
        options={sets}
        sx={{ width: 300 }}
        value={selectedValue}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField {...params} label="Your Sets" />}
      />
      <h1 className="cardIndex">
        {index.current + 1}/{flashCards.length}
      </h1>
      <div className="cardHolder">
        <button
          className="DisplayedCard"
          placeholder="Need Card"
          onClick={() => {
            handleCardClick();
            hideOrShowArrows();
          }}
          onAnimationEnd={() => {
            setFlip(0);
            setText(tempVar.current);
            hideOrShowArrows();
          }}
          flip={flip}
        >
          {cardText}
        </button>
        <img
          className="LeftButton"
          id="arrowLeft"
          onClick={() => handleLeftClick()}
          src={leftArrow}
        />
        <img
          className="RightButton"
          id="arrowRight"
          onClick={() => handleRightClick()}
          src={rightArrow}
        />
      </div>
    </>
  );
}
