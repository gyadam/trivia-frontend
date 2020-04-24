import React, { useState, useEffect } from 'react';

import '../stylesheets/App.css';
import Question from './Question';
import Search from './Search';
import $ from 'jquery';
import { useAuth0 } from "../react-auth0-spa";


function QuestionView() {

  const [state , setState] = useState({
    questions : [],
    page : 1,
    totalQuestions: 0,
    categories: {},
    currentCategory: null,
  })

  const { getTokenSilently } = useAuth0();

  async function getQuestions(){
    const token = await getTokenSilently();
    $.ajax({
      url: `https://trivbackend.herokuapp.com/questions?page=${state.page}`,
      type: "GET",
      headers: {"Authorization" : `Bearer ${token}`},
      success: (result) => {
        setState( prevState => ({
          ...prevState,
          questions: result.questions,
          totalQuestions: result.totalQuestions,
          categories: result.categories,
          currentCategory: result.currentCategory
        }))
        return;
      },
      error: (error) => {
        alert('Unable to load questions. Please try your request again')
        return;
      }
    })
  }

  useEffect(() => {
    getQuestions();
  }, [])

  function selectPage(num) {
    setState( prevState => ({
      ...prevState,
      page : num
  }))
  }

  function createPagination(){
    let pageNumbers = [];
    let maxPage = Math.ceil(state.totalQuestions / 10)
    for (let i = 1; i <= maxPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`page-num ${i === state.page ? 'active' : ''}`}
          onClick={() => {selectPage(i)}}>{i}
        </span>)
    }
    return pageNumbers;
  }

  async function getByCategory(id){
    const token = await getTokenSilently();
    $.ajax({
      url: `https://trivbackend.herokuapp.com/categories/${id}/questions`,
      type: "GET",
      headers: {"Authorization" : `Bearer ${token}`},
      success: (result) => {
        setState( prevState => ({
          ...prevState,
          questions: result.questions,
          totalQuestions: result.totalQuestions,
          currentCategory: result.currentCategory
        }))
        return;
      },
      error: (error) => {
        alert('Unable to load questions. Please try your request again')
        return;
      }
    })
  }

  async function submitSearch(searchTerm){
    const token = await getTokenSilently();
    $.ajax({
      url: `https://trivbackend.herokuapp.com/questions`,
      type: "POST",
      headers: {"Authorization" : `Bearer ${token}`},
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({searchTerm: searchTerm}),
      xhrFields: {
        withCredentials: false
      },
      crossDomain: true,
      success: (result) => {
        setState( prevState => ({
          ...prevState,
          questions: result.questions,
          totalQuestions: result.totalQuestions,
          currentCategory: result.currentCategory
        }))
      },
      error: (error) => {
        alert('Unable to load questions. Please try your request again')
        return;
      }
    })
  }

  function navTo(uri, id){
    window.location.href = window.location.origin + uri + '/' + id;
  }

  const questionAction = function(id){
    return async function (action) {
      const token = await getTokenSilently();
      if(action === 'DELETE') {
        if(window.confirm('are you sure you want to delete the question?')) {
          $.ajax({
            url: `https://trivbackend.herokuapp.com/questions/${id}`,
            type: "DELETE",
            headers: {"Authorization" : `Bearer ${token}`},
            success: (result) => {
              getQuestions();
            },
            error: (error) => {
              alert('Unable to delete question. Please try your request again')
              return;
            }
          })
        }
      }
      else if(action === 'EDIT'){
        navTo('/edit', id)
      }
    }
  } 

  return (
    <div className="question-view">
      <div className="categories-list">
        <h2 onClick={() => {getQuestions()}}>Categories</h2>
        <ul>
          {Object.keys(state.categories).map((id, ) => (
            <li key={id} onClick={() => {getByCategory(id)}}>
              {state.categories[id]}
              <img className="category" src={`${state.categories[id].toLowerCase()}.svg`} width="20" height="20"/>
            </li>
          ))}
        </ul>
        <Search submitSearch={submitSearch}/>
      </div>
      <div className="questions-list">
        <h2>Questions</h2>
        {state.questions.map((q, ind) => (
          <Question
            key={q.id}
            question={q.question}
            answer={q.answer}
            category={state.categories[q.category]} 
            difficulty={q.difficulty}
            questionAction={questionAction(q.id)}
          />
        ))}
        <div className="pagination-menu">
          {createPagination()}
        </div>
      </div>

    </div>
  );
}

export default QuestionView;
