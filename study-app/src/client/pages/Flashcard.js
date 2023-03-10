import { Card, Deck} from '../components'
import { Link } from "react-router-dom";
import React, { useState, useRef } from 'react';
import '../styles/home.css';
import '../arrow-left.png';
import Axios from "axios";



export default function Home() {
   
    const [question, setQuestion] = useState(" ");
    const [answer, setAnswer] = useState(" ");
    const [listedQuestion, setListedQuestion] = useState(" ");
    const [listedAnswer, setListedAnswer] = useState(" ");
    let [cardText, setText] = useState("No Cards Yet! Add a card to begin!");
    let [cardAnswer, setAnswerText] = useState("No Cards Yet! Add a card to begin!");
    let [flashCards, setFlashCards] = useState([]);  
    const [flip, setFlip] = useState(0);
    let tempBool = useRef(0);
    let tempVar = useRef("");
    let index = useRef(-1);

    
    function addCard(x,y){
      index.current = index.current + 1;
      const c = Card(x,y);
      flashCards.push(c);
      addToArr(c);
      updateNewCardText();
    }
    const updateListedQuestion = event => {
      setListedQuestion(event.target.value);
    };
    const updateListedAnswer = event => {
      setListedAnswer(event.target.value);
    };
    const updateQuestion = event => {
      setQuestion(event.target.value);
    };
    const updateAnswer = event => {
      setAnswer(event.target.value);
    };
    const updateNewCardText = event => {
      setText(flashCards[index.current].question);
      setAnswerText(flashCards[index.current].answer)
    };
    const updateText = event => {
      if(cardText == flashCards[index.current].question){
        setText(flashCards[index.current].answer);
      }
      else{
        setText(flashCards[index.current].question);
      }
    };

    const handleLeftClick = (type) => {
      if(index.current == 0){
        return;
      }
      else{
        index.current = index.current - 1;
        updateNewCardText();
      }
    };

    const handleRightClick = (type) => {
      if(flashCards[index.current + 1] == null){
        return;
      }
      else{
        index.current = index.current + 1;
        updateNewCardText()
      }
    };

    const handleClear = (type) => {
      flashCards = [];
      index.current = -1;
      setText("No cards");
      setAnswerText("No cards");
      setFlashCards(flashCards);
    }
    function handleCardClick(){
      if(cardText == flashCards[index.current].question){
        tempVar.current = (flashCards[index.current].answer);
      }
      else{
        tempVar.current = (flashCards[index.current].question);
      }
      updateText();
      setFlip(1);
      setText("");
    }
    function handleAddClick(){
      addCard(question,answer);
      updateNewCardText();
      document.querySelector('.QuestionButton').value = '';
      document.querySelector('.AnswerButton').value = '';
    }

    const addToArr = (c) => {
      let cpy = [...flashCards];
      // cpy.push(c)
      setFlashCards(cpy);
    }

    function editText(question,answer){
      for(var i = 0; i <  flashCards.length; i++){
        if(flashCards[i].question === question && flashCards[i].answer === answer){
          changeHandler(`listedQ${i}`,i,question);
          changeHandler(`listedA${i}`,i,answer);
        }
      }
      let cpy = [...flashCards];
      setFlashCards(cpy);
    }

    function changeHandler(qOrA,index,previousText){
      var listed = document.getElementById(qOrA);
      var input = document.createElement("input");
      input.innerHTML = "enter new text";
      if(qOrA === `listedQ${index}`){
        input.onchange = updateListedQuestion;
        input.placeholder = "Edit Question";
        input.className = "changeInputQuestion";
        input.value = previousText;
        input.id = qOrA;
        setListedQuestion(previousText);
      }
      else{
        input.onchange = updateListedAnswer;
        input.placeholder = "Edit Answer";
        input.className = "changeInputAnswer";
        input.value = previousText;
        input.id = qOrA;
        setListedAnswer(previousText);
       
      }
      
      listed.parentNode.replaceChild(input, listed);
    }
    function gottenIndex(question){
      let number = -1;
      for(var i = 0; i <  flashCards.length; i++){
        if(flashCards[i].question === question ){
          number = i;
        }
      }
      return number;
    }
    function functionHandleEditRevert(type,indexF,text){
      var listed;
      var input;

      if(String(type) =="question"){
        listed = document.getElementById(`listedQ${indexF}`);
        input = document.createElement("h1");
        input.innerHTML = text;
        input.id = `listedQ${indexF}`;
        flashCards[indexF].question = text;
        setText(text);
        
      }
      else{
        listed = document.getElementById(`listedA${indexF}`);
        input = document.createElement("h2");
        input.innerHTML = text;
        input.id = `listedA${indexF}`;
        flashCards[indexF].answer = text;
        setAnswerText(text);
      }
      listed.parentNode.replaceChild(input, listed);
    }

    function handleEditMode(question,answer,indexF){
      if(tempBool.current == 1){
        functionHandleEditRevert("question",indexF,listedQuestion);
        functionHandleEditRevert("answer",indexF,listedAnswer);
        tempBool.current = 0;
       
      }
      else{
        editText(question,answer,"editButton");
        tempBool.current = 1;
      }
    }
    const getCards = () => {
      Axios.get("http://localhost:3001/sets").then((response) => {
        setFlashCards(response.data);
      });
    };
    
    const addToDB = () => {
      Axios.post("http://localhost:3001/addCardToDB", {
        userId : 1,
        cards : JSON.stringify(flashCards)
    });
    }

    const updateSet = () => {
      Axios.put("http://localhost:3001/updateCards",{
        cards : JSON.stringify(flashCards),
        setId : 1
      });
    }
    
    

      return (
        <>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
        </style>
        <div>
        <input  onChange={updateQuestion} placeholder = "Enter Question" class='QuestionButton'/>
        <input  onChange={updateAnswer} placeholder = "Enter Answer" class='AnswerButton'/>  
        </div>
        {/* <button class = 'addButton' onClick={()=> getCards()}> Click to add card </button> */}
        <button class = 'addButton' onClick={()=> handleAddClick()}> Click to add card </button>
        <br />
        <h1 className='cardIndex'>{index.current + 1}/{flashCards.length}</h1>
        <button class = "DisplayedCard" placeholder='Need Card' 
        onClick={()=> handleCardClick()}
        onAnimationEnd={() => {setFlip(0); setText(tempVar.current);}}
        flip={flip}>
        {cardText}
        </button>
        <button class = "LeftButton" onClick={() => handleLeftClick()}> {"<-"}
        </button>
        <button class = "RightButton"onClick={() => handleRightClick()}>{"->"}</button>
        <button class = "EmptyButton"onClick={() => handleClear()}>{"Empty List"}</button>
        <button class = "addToDB_Button"onClick={() => updateSet()}>{"Update Set"}</button>
        {flashCards.map((card, i) => (
          <div className="card-container" key={card.question}>
              <h1 id = {`listedQ${gottenIndex(card.question)}`}  className='listed-questions'>{card.question}</h1>
              <h2 id = {`listedA${gottenIndex(card.question)}`}>{card.answer}</h2>
              <button id = "editButton" className='editButton' onClick={() => {handleEditMode(card.question,card.answer,gottenIndex(card.question))}}>{"Edit"}</button>
          </div> 
        ))}
        </> 
      )
  }