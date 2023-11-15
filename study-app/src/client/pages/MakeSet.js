import '../styles/actualHome.css';
import { Card } from '../components';
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import trashcan from '../trashcan.png';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function MakeSet() {
  let [flashCards, setFlashCards] = useState([{ question: '', answer: '' }, { question: '', answer: '' }, { question: '', answer: '' }, { question: '', answer: '' }, { question: '', answer: '' }]);
  let [setName, setSetName] = useState('');
  const [sets, setSets] = useState([]);
  const [setIds, setSetIds] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  let index = useRef(0);
  let cardAmount = useRef(Object.keys(flashCards).length)

  useEffect(() => {
    if (localStorage.getItem('loginState') === '1') {
      getCardsForDropDown();
    }
  }, []);


  function addCard(x, y) {
    index.current = index.current + 1;
    const c = Card(x, y);
    setFlashCards([...flashCards, c]);
    cardAmount.current = Object.keys(flashCards).length;
  }

  const updateSetName = (event) => {
    setSetName(event.target.value);
  };

  const updateQuestionCard = (event, index) => {
    let updatedCards = [...flashCards];
    updatedCards[index].question = event.target.value;
    setFlashCards(updatedCards);
    cardAmount.current = Object.keys(flashCards).length;
  };

  const getCardsFromDatabase = (setId) => {
    axios.get(`http://localhost:3001/cards/${localStorage.getItem('id')}/${setId}`)
      .then((response) => {
        if (response != null) {
          let data = response.data[0];
          data = data['cards'];
          setFlashCards(JSON.parse(data));
          cardAmount.current = Object.keys(flashCards).length;
        }
      });
  };

  const updateAnswerCard = (event, index) => {
    let updatedCards = [...flashCards];
    updatedCards[index].answer = event.target.value;
    setFlashCards(updatedCards);
    cardAmount.current = Object.keys(flashCards).length;
  };

  function deleteACard(givenIndex) {
    let updatedCards = [...flashCards];
    while (givenIndex < flashCards.length) {
      updatedCards[givenIndex] = updatedCards[givenIndex + 1]
      givenIndex++;
    }
    updatedCards.pop();
    setFlashCards(updatedCards);
    cardAmount.current = Object.keys(flashCards).length;
  }

  const getCardsForDropDown = () => {
    axios.get(`http://localhost:3001/getUserSets/${localStorage.getItem('id')}`)
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

  const handleCreateSet = () => {
    axios.post("http://localhost:3001/addCardToDB", {
      userId: localStorage.getItem('id'),
      setName: setName,
      cards: JSON.stringify(flashCards)
    });
  }

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedValue(newValue);
    if (newValue !== null) {
      const setId = newValue.id;
      getCardsFromDatabase(setId);
    }
  };

  return (
    <>
      <div className="make-set-container">
        <input
          onChange={updateSetName}
          className="setNamed"
          placeholder="Enter the set name"
        />
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
        <div className="flashcards-container">
          {flashCards.map((card, index) => (
            <div className="card-container" key={index}>
              <div className="input-and-button-container">
                <input
                  className="custom-input-left"
                  onChange={(event) => updateQuestionCard(event, index)}
                  value={card.question}
                  placeholder={'Question'}
                  id={`listedQ${index}`}
                />
                <input
                  className="custom-input-right"
                  onChange={(event) => updateAnswerCard(event, index)}
                  value={card.answer}
                  placeholder={'Answer'}
                  id={`listedA${index}`}
                />
                {index > 4 ? (
                  <button
                    className="remove-button"
                    onClick={() => deleteACard(index)}>
                    <img className="trash-icon" src={trashcan} alt="Delete" />
                  </button>
                ) : null}
                {index ===  (cardAmount.current - 1)? 
                <button className='addButton' 
                onClick={() => addCard('', '')}>
                + </button> 
                : null}
              </div>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button className='createButton' onClick={() => handleCreateSet()}>{cardAmount.current}</button>
        </div>
      </div>
    </>
  );
}
