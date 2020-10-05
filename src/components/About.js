import '../stylesheets/About.css';
import React from 'react'

const About = () => {
    return (
        <div className="info-header">
            About QuizOverflow
            <div className="info-text">
                <p>
                  QuizOverflow is a personal project website where users can play quizzes in multiple categories.
                </p>
                <p>
                  The website allows visitors to play categorized quizzes consisting of 5 questions in the selected category.
                  Visitors can also view the list of questions, but can only view answers and edit/delete the questions if they are logged in and have the right permissions, which are controlled through <a href="https://auth0.com">Auth0</a>.
                </p>
                <p>
                  The goal of the project was to:
                  <ul>
                    <li>Create a backend API following RESTful principles</li>
                    <li>Create a frontend to interact with the backend</li>
                    <li>Create a database using Flask-SQLAlchemy</li>
                    <li>Use Auth0 to authenticate users with JSON web tokens (JWTs)</li>
                    <li>Use role-based access control (RBAC) to authorize users to make API calls</li>
                    <li>Apply test-driven development, writing unit tests for each endpoint</li>
                    <li>Deploy the backend and frontend to Heroku</li>
                  </ul>
                  <p>
                  Both the frontend and the backend are hosted on Heroku, and their source code is available on <a href="https://github.com/gyadam/quizoverflow">GitHub</a>.
                </p>
                  I used the following technologies to build the website :
                  <ul>
                    <li><b>SQLAlchemy ORM</b> as the ORM library</li>
                    <li><b>PostgreSQL</b> for the database</li>
                    <li><b>Python3</b> and <b>Flask</b> as the backend language and framework</li>
                    <li><b>React</b>, <b>Javascript</b>, <b>HTML</b> and <b>CSS</b> for the frontend</li>
                  </ul>
                </p>   
            </div>
        </div>
    );
}

export default About;