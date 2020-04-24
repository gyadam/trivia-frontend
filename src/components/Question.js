import React, { useState } from 'react';
import '../stylesheets/Question.css';

function Question(props) {
  
  const [isVisible, setVisibility] = useState(false);
  const { question, answer, category, difficulty } = props;

  return (
    <div className="Question-holder">
      <div className="Question">{question}</div>
      <div className="Question-status">
        <img className="category" src={`${category.toLowerCase()}.svg`}/>
        <div className="difficulty">Difficulty: {difficulty}</div>
        <img src="delete.png" className="delete" onClick={() => props.questionAction('DELETE')}/>
        <img src="edit.png" className="edit" onClick={() => props.questionAction('EDIT')}/>          
      </div>
      <div className="show-answer button"
          onClick={() => setVisibility(!isVisible)}>
          {isVisible ? 'Hide' : 'Show'} Answer
        </div>
      <div className="answer-holder">
        <span style={{"visibility": isVisible ? 'visible' : 'hidden'}}>Answer: {answer}</span>
      </div>
    </div>
  );
}

export default Question;
