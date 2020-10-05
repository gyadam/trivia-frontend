import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { useAuth0 } from "../react-auth0-spa";

import '../stylesheets/EditView.css';

function EditView(props) {

  const [categories, setCategories] = useState([]);

  const { getTokenSilently } = useAuth0();

  const [state , setState] = useState({
    question : "",
    answer : "",
    difficulty: 1,
    category: 1
  })

  function getCategories(){
    $.ajax({
      url: `https://trivbackend.herokuapp.com/categories`,
      type: "GET",
      success: (result) => {
        setCategories(result.categories);
        return;
      },
      error: (error) => {
        alert('Unable to load categories. Please try your request again')
        return;
      }
    });
  }

  async function getQuestion(){
    const token = await getTokenSilently();
    $.ajax({
      url: `https://trivbackend.herokuapp.com/questions/${props.match.params.id}`,
      type: "GET",
      headers: {"Authorization" : `Bearer ${token}`},
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
  }

  useEffect(() => {
    getCategories();
    getQuestion();
  })

  function navTo(uri){
    window.location.href = window.location.origin + uri;
  }

  async function editQuestion(event){
    event.preventDefault();
    const token = await getTokenSilently();
    $.ajax({
      url: `https://trivbackend.herokuapp.com/questions/${props.match.params.id}`,
      type: "PATCH",
      headers: {"Authorization" : `Bearer ${token}`},
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
        navTo('/list');
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
