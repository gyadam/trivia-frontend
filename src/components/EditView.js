import React, { Component, useState, useEffect } from 'react';
import $ from 'jquery';

import '../stylesheets/EditView.css';

function navTo(uri){
  window.location.href = window.location.origin + uri;
}

function EditView(props) {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState([]);

  const [state , setState] = useState({
    question : "",
    answer : "",
    difficulty: 1,
    category: 1
  })

  useEffect(() => {
    $.ajax({
      url: `https://trivbackend.herokuapp.com/categories`,
      type: "GET",
      success: (result) => {
        setIsLoaded(true);
        setCategories(result.categories);
        return;
      },
      error: (error) => {
        alert('Unable to load categories. Please try your request again')
        return;
      }
    });
    $.ajax({
      url: `https://trivbackend.herokuapp.com/questions/${props.match.params.id}`,
      type: "GET",
      success: (result) => {
        setState({
          question: result.question.question,
          answer: result.question.answer,
          difficulty: result.question.difficulty,
          category: result.question.category
        });
        return;
      },
      error: (error) => {
        alert('Unable to load question. Please try your request again')
        return;
      }
    })

  }, [])

  const editQuestion = (event) => {
    event.preventDefault();
    $.ajax({
      url: `https://trivbackend.herokuapp.com/questions/${props.match.params.id}`,
      type: "PATCH",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        question: state.question,
        answer: state.answer,
        difficulty: state.difficulty,
        category: state.category
      }),
      xhrFields: {
        withCredentials: false
      },
      crossDomain: true,
      success: (result) => {
        navTo('/');
        return;
      },
      error: (error) => {
        alert('Unable to edit question. Please try your request again')
        return;
      }
    })
  }

  const handleChange = (e) => {
    const {name , value} = e.target
    setState( prevState => ({
        ...prevState,
        [name] : value
    }))
  }

    return (
      <div id="edit-form">
        <h2>Add a New Trivia Question</h2>
        <form className="form-view" id="add-question-form" onSubmit={editQuestion}>
          <label>
            Question
            <input type="text" name="question" value={state.question} onChange={handleChange}/>
          </label>
          <label>
            Answer
            <input type="text" name="answer" value={state.answer} onChange={handleChange}/>
          </label>
          <label>
            Difficulty
            <select name="difficulty" value = {state.difficulty} onChange={handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <label>
            Category
            <select name="category" value={state.category} onChange={handleChange}>
              {Object.keys(categories).map(id => {
                  return (
                    <option key={id} value={id}>{categories[id]}</option>
                  )
                })}
            </select>
          </label>
          <input type="submit" className="button" value="Submit" />
        </form>
      </div>
    );
  }


export default EditView;
