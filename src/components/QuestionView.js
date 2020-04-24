import React, { Component, useState, useEffect } from 'react';

import '../stylesheets/App.css';
import Question from './Question';
import Search from './Search';
import $ from 'jquery';
import EditView from './EditView';

function navTo(uri, id){
  window.location.href = window.location.origin + uri + '/' + id;
}

function QuestionView() {

  const [state , setState] = useState({
    questions : [],
    page : 1,
    totalQuestions: 0,
    categories: {},
    currentCategory: null,
  })

  function getQuestions(){
    $.ajax({
      url: `https://trivbackend.herokuapp.com/questions?page=${state.page}`,
      type: "GET",
      success: (result) => {
        setState({
          questions: result.questions,
          totalQuestions: result.total_questions,
          categories: result.categories,
          currentCategory: result.current_category })
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

  const getByCategory = (id) => {
    $.ajax({
      url: `https://trivbackend.herokuapp.com/categories/${id}/questions`,
      type: "GET",
      success: (result) => {
        setState({
          questions: result.questions,
          totalQuestions: result.total_questions,
          currentCategory: result.current_category })
        return;
      },
      error: (error) => {
        alert('Unable to load questions. Please try your request again')
        return;
      }
    })
  }

  const submitSearch = (searchTerm) => {
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
        setState({
          questions: result.questions,
          totalQuestions: result.total_questions,
          currentCategory: result.current_category })
        return;
      },
      error: (error) => {
        alert('Unable to load questions. Please try your request again')
        return;
      }
    })
  }

  const questionAction = (id) => (action) => {
    if(action === 'DELETE') {
      if(window.confirm('are you sure you want to delete the question?')) {
        $.ajax({
          url: `https://trivbackend.herokuapp.com/questions/${id}`,
          type: "DELETE",
          success: (result) => {
            getQuestions();
          },
          error: (error) => {
            alert('Unable to load questions. Please try your request again')
            return;
          }
        })
      }
    }
    else if(action === 'EDIT'){
      navTo('/edit', id)
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
