import React, { Component } from 'react';
import $ from 'jquery';

import '../stylesheets/EditView.css';

class EditView extends Component {
  constructor(props){
    super(props);
    this.state = {
      question_id: "",
      question: "",
      answer: "",
      difficulty: 1,
      category: 1,
      categories: {}
    }
    //console.log(this.difficulty)
  }

  componentDidMount(props){
    this.getCategories();
    this.getQuestion();
    console.log(this.state.question);
  }

  navTo(uri){
    window.location.href = window.location.origin + uri;
  }

  getCategories = () => {
    $.ajax({
      url: `https://trivbackend.herokuapp.com/categories`,
      type: "GET",
      success: (result) => {
        this.setState({ categories: result.categories })
        return;
      },
      error: (error) => {
        alert('Unable to load categories. Please try your request again')
        return;
      }
    })
  }

  getQuestion = () => {
    $.ajax({
      url: `https://trivbackend.herokuapp.com/questions/${this.props.match.params.id}`,
      type: "GET",
      success: (result) => {
        this.setState({
          question: result.question.question,
          answer: result.question.answer,
          difficulty: result.question.difficulty,
          category: result.question.category
        });
        console.log("state set!")
        return;
      },
      error: (error) => {
        alert('Unable to load question. Please try your request again')
        return;
      }
    })
  }


  editQuestion = (event) => {
    event.preventDefault();
    $.ajax({
      url: `https://trivbackend.herokuapp.com/questions/${this.props.match.params.id}`,
      type: "PATCH",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        question: this.state.question,
        answer: this.state.answer,
        difficulty: this.state.difficulty,
        category: this.state.category
      }),
      xhrFields: {
        withCredentials: false
      },
      crossDomain: true,
      success: (result) => {
        //document.getElementById("add-question-form").reset();
        this.navTo('/');
        return;
      },
      error: (error) => {
        alert('Unable to edit question. Please try your request again')
        return;
      }
    })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div id="edit-form">
        <h2>Add a New Trivia Question</h2>
        <form className="form-view" id="add-question-form" onSubmit={this.editQuestion}>
          <label>
            Question
            <input type="text" name="question" value={this.state.question} onChange={this.handleChange}/>
          </label>
          <label>
            Answer
            <input type="text" name="answer" value={this.state.answer} onChange={this.handleChange}/>
          </label>
          <label>
            Difficulty
            <select name="difficulty" value = {this.state.difficulty} onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <label>
            Category
            <select name="category" value={this.state.category} onChange={this.handleChange}>
              {Object.keys(this.state.categories).map(id => {
                  return (
                    <option key={id} value={id}>{this.state.categories[id]}</option>
                  )
                })}
            </select>
          </label>
          <input type="submit" className="button" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditView;
