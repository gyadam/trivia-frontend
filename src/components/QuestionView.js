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

  async function getQuestions(page){
    $.ajax({
      url: `https://trivbackend.herokuapp.com/questions?page=${page}`,
      type: "GET",
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
    getQuestions(state.page);
  }, [state.page])

  function createPagination(){
    let pageNumbers = [];
    let maxPage = Math.ceil(state.totalQuestions / 10)
    for (let i = 1; i <= maxPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`page-num ${i === state.page ? 'active' : ''}`}
          onClick={() => setState(
            prevState => ({...prevState, page : i,})
          )}>{i}
        </span>)
    }
    return pageNumbers;
  }

  async function getByCategory(id){
    if (id === "0"){
      getQuestions();
    } else {
      $.ajax({
        url: `https://trivbackend.herokuapp.com/categories/${id}/questions`,
        type: "GET",
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
  }

  async function submitSearch(searchTerm){
    $.ajax({
      url: `https://trivbackend.herokuapp.com/questions`,
      type: "POST",
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
      <div className="questions-list">
          <h2>
            {state.currentCategory ? state.categories[state.currentCategory] + " " : "All "}
            Questions
          </h2>
          <div className="categories-list">
            <label htmlFor="categories-dropdown">Category: </label>
            <select name="categories-dropdown" id="categories-dropdown" onChange={(e) => {getByCategory(e.target.value)}}>
              <option value={0} key={0}>All</option>
              {Object.keys(state.categories).map((id, ) => (
                <option value={id} key={id}>{state.categories[id]}</option>
              ))}
            </select>
          </div>
          <Search submitSearch={submitSearch}/>
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
