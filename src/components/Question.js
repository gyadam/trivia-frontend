import React, { useState } from 'react';
import '../stylesheets/Question.css';
import { useAuth0 } from "../react-auth0-spa";

function Question(props) {
  
  const [isVisible, setVisibility] = useState(false);
  const { question, answer, category, difficulty } = props;
  const { isAuthenticated, loginWithRedirect} = useAuth0();

  return (
    <div className="Question-holder">
      <div className="Question">{question}</div>
      <div className="Question-status">
        <img className="category" src={`${category.toLowerCase()}.svg`} alt="Category icon"/>
        <div className="difficulty">Difficulty: {difficulty}</div>
        <div className={isAuthenticated ? "delete" : "nodelete"}
        onClick={() => {
          if (isAuthenticated){
            props.questionAction('DELETE');
          } 
        }}>
          <img src="delete.png" alt="Delete icon"/>
          <span className="tooltiptext">Login to delete question</span>
        </div>

        <div className={isAuthenticated ? "edit" : "noedit"}
        onClick={() => {
          if (isAuthenticated){
            props.questionAction('EDIT');
          } 
        }}>
          <img src="edit.png" alt="Edit icon"/>
          <span className="tooltiptext">Login to edit question</span>
        </div>        
      </div>
      <div className="show-answer button"
          onClick={() => {
            if (isAuthenticated){
              setVisibility(!isVisible);
            }
            else{
              loginWithRedirect({});
            }
          }}>

          {!isAuthenticated ? 'Login for' : (isVisible ? 'Hide' : 'Show')} Answer
        </div>
      {isAuthenticated ? 
      <div className="answer-holder">
        <span style={{"visibility": isVisible ? 'visible' : 'hidden'}}>Answer: {answer}</span>
      </div> : null}
    </div>
  );
}

export default Question;
