import '../stylesheets/About.css';
import React from 'react'

const About = () => {
    return (
        <div className="info-header">
            About QuizOverflow
            <div className="info-text">
                <p>
                  This website was created for the  <a href="https://udacity.com">Full Stack Developer Nanodegree at Udacity</a>.
                </p>
                <p>
                  Both the frontend and the backend are hosted on Heroku, and their source code is available on <a href="https://github.com/gyadam/quizoverflow">GitHub</a>.
                </p>
                <p>
                  Although a very simple website, I learned a lot while building it and really enjoyed the process, as I had no prior experience in web development at all.
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
                    <li>Deploy the backend (and frontend) application to Heroku</li>
                  </ul>
                  Tech Stack:
                  <ul>
                    <li><b>SQLAlchemy ORM</b> as the ORM library</li>
                    <li><b>PostgreSQL</b> for the database</li>
                    <li><b>Python3</b> and <b>Flask</b> as the server language and server framework</li>
                    <li><b>HTML</b>, <b>CSS</b>, and <b>Javascript</b> with <b>Node.js</b> and <b>React</b> for the frontend</li>
                  </ul>
                  
                
                
               
                
                
                  
                </p>
            
        </div>
        </div>
    );
}

export default About;